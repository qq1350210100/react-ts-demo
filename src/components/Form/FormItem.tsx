import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { FormContext } from './Form'
import { IOnChange } from './hooks'

export interface ICallback {
	(desc: string): void
}

const useStyles = makeStyles(
	createStyles({
		root: {
			boxSizing: 'border-box',
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			padding: 0,
			marginBottom: 24,

			'&>div': {
				position: 'relative'
			}
		},
		labelText: {},
		tip: {
			display: 'flex',
			alignItems: 'center',
			position: 'absolute',
			top: 32,
			left: 0,
			width: '100%',
			minHeight: 24,
			margin: 0,
			padding: 0,
			color: '#ff4d4f'
		}
	})
)

interface IValidator {
	(value?: string | boolean, callback?: ICallback): Promise<void>
}

interface IFormItemProps extends React.HTMLAttributes<HTMLLabelElement> {
	className?: string
	label?: string
	name?: string
	initialValue?: string | boolean
	validator?: IValidator
}

const FormItem: React.FC<IFormItemProps> = props => {
	const { children, className, label, name, initialValue, validator } = props

	const ctxProps = React.useContext(FormContext)
	const {
		values = {},
		errors = [],
		onChange,
		setFieldError,
		cleanFieldError,
		setFieldsValue
	} = ctxProps

	const value = name ? values[name] : undefined
	const error = errors.find(err => err.name === name)
	const hasError = error !== undefined

	const callback: ICallback = desc => {
		if (name) {
			if (desc) {
				setFieldError({ name, desc })
			} else {
				cleanFieldError(name)
			}
		}
	}

	const onCustomChange: IOnChange = (value, name) => {
		validator && validator(value, callback)
		return onChange(value, name)
	}

	React.useEffect(() => {
		if (name && setFieldsValue) {
			setFieldsValue({ [name]: initialValue })
		}
	}, [])

	const newProps = { value, name, error: hasError, onChange: onCustomChange }

	const classes = useStyles()

	const formItemCls = clsx(classes.root, className)

	return (
		<label className={formItemCls}>
			{label && <span className={classes.labelText}>{label}：</span>}
			<div>
				{React.Children.map(children as any, (child: JSX.Element) =>
					React.cloneElement(child, newProps)
				)}
				<span className={classes.tip}>{error?.desc}</span>
			</div>
		</label>
	)
}

export default React.memo(FormItem)
