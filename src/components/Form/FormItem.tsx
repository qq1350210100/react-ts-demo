import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { FormContext } from './Form'
import { ICallback } from './hooks'

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

export interface IValidator {
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
	const { values, errors, onChange, setFieldsValue, syncFormItem } = ctxProps

	const value = name && values?.[name]
	const error = errors?.find(err => err.name === name)
	const isError = error !== undefined

	React.useEffect(
		() => {
			if (name) {
				syncFormItem(name, validator)
				setFieldsValue({ [name]: initialValue })
			}
		},
		// contextProps 不要放到 deps 里
		[]
	)

	const classes = useStyles()

	const formItemCls = clsx(classes.root, className)

	return (
		<div className={formItemCls}>
			{label && <label className={classes.labelText}>{label}：</label>}
			<div>
				{React.Children.map(children as any, (child: JSX.Element) => {
					const baseProps = { name, value, onChange }
					return child?.type?.displayName === 'Input'
						? React.cloneElement(child, { ...baseProps, error: isError })
						: React.cloneElement(child, baseProps)
				})}
				<span className={classes.tip}>{error?.desc}</span>
			</div>
		</div>
	)
}

export default React.memo(FormItem)
