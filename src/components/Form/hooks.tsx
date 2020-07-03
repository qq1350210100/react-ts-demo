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
	(): Promise<IValues | IErrors> | any
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

	// 下级组件中 FormItem 的 props
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
		async (item: IItem): Promise<validateState> => {
			const { value, name, validator } = item
			let result = validateState.FULFILLED
			if (validator) {
				const callback: ICallback = desc => {
					if (desc) {
						_setFieldError({ name, desc, validator })
						result = validateState.REJECTED
					} else {
						_cleanFieldError(name)
					}
				}
				await validator(value, callback)
			}
			return result
		},
		[_setFieldError, _cleanFieldError]
	)

	/**
	 * 批量校验表单项：
	 */
	const _validateItems = React.useCallback(
		async (items: IItem[]): Promise<validateState> => {
			const validators = items.map(_validate)
			const results = await Promise.all(validators)

			return results.some(result => result === validateState.REJECTED)
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
			const newItem = { name, validator }
			setItems(prev => [...prev, newItem])
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
		(...names) =>
			new Promise((resolve, reject) => {
				const receiveResult = (res: validateState) => {
					if (res === validateState.REJECTED) {
						reject(res)
					} else {
						resolve(res)
					}
				}

				// 区分参数，names不传即校验全部
				if (names.length) {
					const namesSet = new Set(names)
					const targets = items.filter(item => namesSet.has(item.name))
					_validateItems(targets).then(receiveResult)
				} else {
					_validateItems(items).then(receiveResult)
				}
			}),
		[items, _validateItems]
	)

	const submit: ISubmit = React.useCallback(
		() =>
			new Promise(async (resolve, reject) => {
				try {
					await validateFields()
					resolve(values)
				} catch (err) {
					reject(err)
				}
			}),
		[values, validateFields]
	)

	React.useEffect(
		() => {
			if (origin) {
				items.forEach(item => {
					// 只校验表单值变更项
					if (origin === item.name) {
						validateFields(origin).then(
							() => {},
							() => {}
						)
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
