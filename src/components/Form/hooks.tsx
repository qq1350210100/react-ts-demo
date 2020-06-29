import React from 'react'

export interface IValues {
	[key: string]: string | boolean | undefined
}

export interface IError {
	name: string
	desc: string
}

export type IErrors = IError[]

export interface IOnChange {
	(value?: string, name?: string): void
}

export const useForm = () => {
	const [values, setValues] = React.useState<IValues>({} as IValues)
	const [errors, setErrors] = React.useState<IErrors>([])

	const onChange: IOnChange = (value, name) => {
		if (name) {
			setValues(prev => ({
				...prev,
				[name]: value
			}))
		}
	}

	const getFieldValue = React.useCallback(
		(name: string): string | boolean | undefined => {
			const copyed = { ...values }
			return copyed[name]
		},
		[values]
	)

	const setFieldsValue = newValues => {
		setValues(prev => ({
			...prev,
			...newValues
		}))
	}

	const validateFields = async (...names: string[]) => {
		if (names.length) {
			console.log('names', names)
		} else {
			console.log('validate all')
		}
	}

	const submit = (): Promise<IValues | IErrors> =>
		new Promise((resolve, reject) => {
			if (true) {
				resolve(values)
			} else {
				reject(['sdds', 'bbbb'])
			}
		})

	const setFieldError = (newError: IError) => {
		setErrors(prev => [...prev, newError])
	}

	const cleanFieldError = (...names: string[]) => {
		if (names.length) {
			names.forEach(name => {
				setErrors(prev => prev.filter(err => err.name !== name))
			})
		} else {
			setErrors([])
		}
	}

	return {
		onChange,
		values,
		errors,
		setFieldError,
		cleanFieldError,
		submit,
		getFieldValue,
		setFieldsValue,
		validateFields
	}
}
