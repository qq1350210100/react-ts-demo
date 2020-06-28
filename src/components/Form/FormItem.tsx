import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { FormContext } from './Form'

const useStyles = makeStyles(
	createStyles({
		root: {
			boxSizing: 'border-box',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: '100%',
			'&>span': {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
				height: 32,
				color: '#303133',
				overflow: 'hidden'
			}
		},
		tip: {
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
	children?: any
	className?: string
	label?: string
	name?: string
}

const FormItem: React.FC<IFormItemProps> = props => {
	const { children, className, label, name } = props

	const ctxProps = React.useContext(FormContext)
	const { values, onChange } = ctxProps
	const value: string | boolean = name ? values[name] : undefined

	const classes = useStyles()

	const formItemCls = clsx(classes.root, className)

	return (
		<label className={formItemCls}>
			{label && (
				<span>
					{label}：{<span className={classes.tip}></span>}
				</span>
			)}
			{React.Children.map(children, (child: JSX.Element) => {
				return React.cloneElement(child, { value, onChange, name })
			})}
		</label>
	)
}

export default React.memo(FormItem)
