import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { IValues } from './hooks'

interface IForm {
	values: IValues
	onChange: (value?: string, name?: string) => void
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

const defaultCtx = { values: {}, onChange() {} }

export const FormContext = React.createContext(defaultCtx)

const Form: React.FC<IFormProps> = props => {
	const {
		children,
		className,
		form: { values, onChange = () => {} } = {},
		onValuesChange = () => {},
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
				values: values ?? {},
				onChange
			}}
		>
			<form {...restProps} className={formCls}>
				{children}
			</form>
		</FormContext.Provider>
	)
}

export default React.memo(Form)
