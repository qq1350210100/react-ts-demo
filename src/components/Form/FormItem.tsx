import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { FormContext } from './Form'
import { IOnChange } from './hooks'

export interface IValidateCB {
	(desc: string): void
}

const useStyles = makeStyles(
	createStyles({
		root: {
			position: 'relative',
			boxSizing: 'border-box',
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			padding: 0,
			marginBottom: 24,
		},
		labelText: {
			marginRight: 8
		},
		tip: {
			position: 'absolute',
			top: 0,
			left: 0,
			color: '#ff4d4f',
			opacity: 0,
			transform: 'translateX(120px)',
			animation: '$enter 250ms forwards'
		},
		'@keyframes enter': {
			from: {
				opacity: 0,
				transform: 'translateX(120px)'
			},
			to: {
				opacity: 1,
				transform: 'translateX(0)'
			}
		}
	})
)

interface IFormItemProps extends React.HTMLAttributes<HTMLLabelElement> {
	className?: string
	label?: string
	name?: string
	validator?: (value?: string | boolean, callback?: IValidateCB) => Promise<void>
}

const FormItem: React.FC<IFormItemProps> = props => {
	const { children, className, label, name, validator } = props

	const ctxProps = React.useContext(FormContext)
	const { values = {}, errors = [], onChange, setFieldError, deleteFieldError } = ctxProps

	const value: string | boolean = name ? values[name] : undefined
	const error = errors.find(err => err.name === name)

	const callback: IValidateCB = desc => {
		if (name) {
			if (desc) {
				setFieldError({ name, desc })
			} else {
				deleteFieldError(name)
			}
		}
	}

	const onChangeAndValidate: IOnChange = (value, name) => {
		validator && validator(value, callback)
		return onChange(value, name)
	}

	const classes = useStyles()

	const formItemCls = clsx(classes.root, className)

	return (
		<label className={formItemCls}>
			{label && <span className={classes.labelText}>{label}：</span>}
			{React.Children.map(children as any, (child: JSX.Element) => {
				const newProps = { value, name, onChange: onChangeAndValidate }
				return React.cloneElement(child, newProps)
			})}
			{<span className={classes.tip}>{error?.desc}</span>}
		</label>
	)
}

export default React.memo(FormItem)
