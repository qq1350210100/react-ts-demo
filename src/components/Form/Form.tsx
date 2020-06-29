import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { IValues, IErrors, IError, IOnChange } from './hooks'

interface IForm {
	values?: IValues
	errors?: IErrors
	onChange: IOnChange
	getFieldValue?: (name: string) => void
	setFieldsValue?: (newValues?: IValues) => void
	setFieldError: (error: IError) => void
	cleanFieldError: (...names: string[]) => void
	validateFields: (...name: string[]) => Promise<void>
}

export interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	className?: string
	form?: IForm
	initialValues?: IValues
	onValuesChange?: (values?: IValues) => void
}

const useStyles = makeStyles(
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-around',
			width: '100%',
			minHeight: 120,
			padding: 8
		}
	})
)

const defaultCtx: IForm = {
	onChange() {},
	getFieldValue() {},
	setFieldsValue() {},
	setFieldError() {},
	cleanFieldError() {},
	validateFields: async () => {},
}

export const FormContext = React.createContext<IForm>(defaultCtx)

const Form: React.FC<IFormProps> = props => {
	const {
		children,
		className,
		initialValues = {},
		onValuesChange = () => {},
		form = {} as IForm,
		...restProps
	} = props

	const classes = useStyles()

	React.useEffect(() => {
		if (form?.setFieldsValue) {
			form.setFieldsValue(initialValues)
		}
	}, [])

	React.useEffect(() => {
		onValuesChange(form.values)
	}, [form.values, onValuesChange])

	const formCls = clsx(classes.root, className)

	return (
		<FormContext.Provider value={form}>
			<form {...restProps} className={formCls}>
				{children}
			</form>
		</FormContext.Provider>
	)
}

export default React.memo(Form)
