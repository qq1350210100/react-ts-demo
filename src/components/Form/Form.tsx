import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { IValues, IErrors, IError, IOnChange } from './hooks'

interface IContextProps {
	values?: IValues
	errors?: IErrors
	onChange: IOnChange
	setFieldError: (error: IError) => void
	deleteFieldError: (targetName?: string) => void
	validateFields: (...fields: string[]) => Promise<void>
}

interface IForm extends IContextProps {
	getFieldValue?: (name: string) => void
	setFieldsValue?: (newValues: IValues) => void
}

export interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	className?: string
	form?: IForm
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

const defaultCtx: IContextProps = {
	onChange() {},
	validateFields: async () => {},
	setFieldError() {},
	deleteFieldError() {}
}

export const FormContext = React.createContext(defaultCtx)

const Form: React.FC<IFormProps> = props => {
	const {
		children,
		className,
		onValuesChange = () => {},
		form: {
			values,
			errors = [],
			onChange = () => {},
			validateFields = async () => {},
			setFieldError = () => {},
			deleteFieldError = () => {}
		} = {},
		...restProps
	} = props

	const classes = useStyles()

	React.useEffect(() => {
		onValuesChange(values)
	}, [values, onValuesChange])

	const formCls = clsx(classes.root, className)

	return (
		<FormContext.Provider
			value={{
				values,
				errors,
				onChange,
				validateFields,
				setFieldError,
				deleteFieldError
			}}
		>
			<form {...restProps} className={formCls}>
				{children}
			</form>
		</FormContext.Provider>
	)
}

export default React.memo(Form)
