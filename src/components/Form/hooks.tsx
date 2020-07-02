import React from 'react'
import { IValidator } from './FormItem'

enum validateState {
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected'
}

export type IValue = string | boolean | undefined

export interface IValues {
	[key: string]: IValue
}

export interface IError {
	name: string
	desc: string
	validator?: IValidator
}

export type IErrors = IError[]

interface IItem {
	value?: string | boolean
	name: string
	validator?: IValidator
}

export interface ICallback {
	(desc: string): void
}

export interface IOnChange {
	(value?: string, name?: string): void
}

export interface ISubmit {
	(): Promise<IValues | IErrors>
}

export interface IGetFieldsValue {
	(name?: string): IValue | void
}

export interface ISetFieldsValue {
	(nextValues: IValues): void
}

export interface IValidateFields {
	(...names: string[]): Promise<string>
}

export interface ISetFieldsError {
	(error: IError): void
}

export interface ICleanFieldError {
	(...names: string[]): void
}

export interface ISyncFormItem {
	(name?: string, validator?: IValidator): void
}

export interface IForm {
	values?: IValues
	errors?: IErrors
	submit: ISubmit
	onChange: IOnChange
	syncFormItem: ISyncFormItem
	getFieldValue: IGetFieldsValue
	setFieldsValue: ISetFieldsValue
	validateFields: IValidateFields
}

export const useForm = (): IForm => {
	const [values, setValues] = React.useState<IValues>({} as IValues)
	const [errors, setErrors] = React.useState<IErrors>([])

	// 存放下级组件中 FormItem 的 props
	const [items, setItems] = React.useState<IItem[]>([])

	// 触发表单值改变的 name
	const [origin, setOrigin] = React.useState<string>()

	const _setFieldError: ISetFieldsError = error => {
		setErrors(prev => {
			if (prev.length) {
				// 数组去重，筛除 name 相同的 error
				const noRepeatPrev = prev.filter(item => item.name !== error.name)
				return [...noRepeatPrev, error]
			} else {
				return [error]
			}
		})
	}

	const _cleanFieldError: ICleanFieldError = (...names) => {
		if (names.length) {
			names.forEach(name => {
				setErrors(prev => prev.filter(err => err.name !== name))
			})
		} else {
			setErrors([])
		}
	}

	const _validate = React.useCallback(
		(item: IItem): Promise<validateState> =>
			new Promise((resolve, reject) => {
				const { value, name, validator } = item
				if (validator) {
					const callback: ICallback = desc => {
						if (desc) {
							_setFieldError({ name, desc, validator })
							reject(validateState.REJECTED)
						} else {
							_cleanFieldError(name)
							resolve(validateState.FULFILLED)
						}
					}
					validator(value, callback)
				} else {
					resolve(validateState.FULFILLED)
				}
			}),
		[_setFieldError, _cleanFieldError]
	)

	/**
	 * 批量校验表单项：
	 * 为什么用 Promise.allSettled 而不是 for await of 执行校验？
	 * - 因为表单 validator 返回的 promise。allSettled 异步执行promise，而 for await of 需要 await 每一个 validator 执行完毕
	 * 都能获取所有结果，为什么不用 Promise.all
	 * - 因为使用 Promise.all 时，promises 中，只要有任意一个 validator rejected，就取不到所有结果
	 */
	const _validateItems = React.useCallback(
		async (items: IItem[]): Promise<validateState> => {
			const validators = items.map(_validate)
			const results = await Promise.allSettled(validators)

			return results.some(result => result.status === validateState.REJECTED)
				? validateState.REJECTED
				: validateState.FULFILLED
		},
		[_validate]
	)

	const _mergeItems = (name: string, value: IValue) => {
		setItems(prev => prev.map(item => (item.name === name ? { ...item, value } : item)))
	}

	const onChange: IOnChange = (value, name) => {
		if (name) {
			setValues(prev => ({
				...prev,
				[name]: value
			}))
			_mergeItems(name, value)
			setOrigin(name)
		}
	}

	// 函数传递给 FormItem 调用，将props同步到form
	const syncFormItem: ISyncFormItem = (name, validator) => {
		if (name) {
			setItems(prev => [...prev, { name, validator }])
		}
	}

	const getFieldValue: IGetFieldsValue = React.useCallback(
		name => {
			if (name) {
				const copyed = { ...values }
				return copyed[name]
			}
		},
		[values]
	)

	const setFieldsValue: ISetFieldsValue = nextValues => {
		setValues(prev => ({
			...prev,
			...nextValues
		}))
		for (const name in nextValues) {
			if (nextValues.hasOwnProperty(name)) {
				const value = nextValues[name]
				_mergeItems(name, value)
				setOrigin(name)
			}
		}
	}

	const validateFields: IValidateFields = React.useCallback(
		async (...names) => {
			let result = validateState.FULFILLED

			// 区分参数，names不传即校验全部
			if (names.length) {
				const namesSet = new Set(names)
				const targets = items.filter(item => namesSet.has(item.name))
				result = await _validateItems(targets)
			} else {
				result = await _validateItems(items)
			}

			return result
		},
		[items, _validateItems]
	)

	const submit: ISubmit = React.useCallback(
		() =>
			new Promise((resolve, reject) => {
				validateFields().then(res => {
					if (res === validateState.FULFILLED) {
						resolve(values)
					} else if (res === validateState.REJECTED) {
						reject(errors)
					}
				})
			}),
		[values, errors, validateFields]
	)

	React.useEffect(
		() => {
			if (origin) {
				items.forEach(item => {
					// 只校验表单值变更项
					if (origin === item.name) {
						validateFields(origin)
					}
				})
			}
		},
		// deps 不添加 validateFields，因为 validateFields deps 已经添加过 items
		[items, origin]
	)

	return {
		onChange,
		values,
		errors,
		submit,
		getFieldValue,
		setFieldsValue,
		validateFields,
		syncFormItem
	}
}
