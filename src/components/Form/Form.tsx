import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { IForm, IValues, useForm, IErrors } from './hooks'

export interface ICallback {
	(desc: string): void
}

export interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	className?: string
	form?: IForm
	initialValues?: IValues
	onValuesChange?: (values?: IValues) => void
	onFinished?: (values: IValues) => void
	onFailed?: () => void
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
	submit: () => ({} as any),
	onChange() {},
	syncFormItem() {},
	getFieldValue() {},
	setFieldsValue() {},
	validateFields: async () => 'pending'
}

export const FormContext = React.createContext<IForm>(defaultCtx)

const Form: React.FC<IFormProps> = props => {
	// form 不传时自动创建
	const defaultForm = useForm()

	const {
		children,
		className,
		initialValues = {},
		form = defaultForm,
		onValuesChange = () => {},
		onFinished = () => {},
		onFailed = () => {},
		...restProps
	} = props

	const customSubmit = React.useCallback(
		() =>
			form.submit().then(
				res => {
					onFinished(res as IValues)
					return res
				},
				err => {
					onFailed()
					return err
				}
			),
		[onFinished, onFailed]
	)

	const classes = useStyles()

	React.useEffect(() => {
		if (form.setFieldsValue) {
			form.setFieldsValue(initialValues)
		}
	}, [])

	React.useEffect(() => {
		onValuesChange(form.values)
	}, [form.values])

	const formCls = clsx(classes.root, className)

	const formCtx = { ...form, submit: customSubmit }

	return (
		<FormContext.Provider value={formCtx}>
			<form {...restProps} className={formCls}>
				{children}
			</form>
		</FormContext.Provider>
	)
}

export default React.memo(Form)
