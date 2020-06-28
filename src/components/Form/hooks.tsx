import React from 'react'

export interface IValues {
	(key: string): string | boolean | undefined
}

export type IErrors = string[]

export const useForm = () => {
	const [values, setValues] = React.useState<IValues>({} as IValues)

	const onChange = (value?: string, name?: string) => {
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

	const submit = (): Promise<IValues | IErrors> =>
		new Promise((resolve, reject) => {
			if (true) {
				resolve(values)
			} else {
				reject(['sdds', 'bbbb'])
			}
		})

	return { values, submit, onChange, getFieldValue, setFieldsValue }
}
