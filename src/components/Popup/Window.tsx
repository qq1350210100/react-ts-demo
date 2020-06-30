import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useTransition, ITransitionOpts } from 'common/hooks'
import Paper from '../Paper'

export interface IWindowProps extends ITransitionOpts {
	className?: string
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: 360,
			minHeight: 400,
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			position: 'fixed',
			userSelect: 'none'
		},
		enter: {
			animation: '$enter 200ms ease-out forwards'
		},
		leave: {
			animation: '$leave 150ms ease-out forwards'
		},
		'@keyframes enter': {
			'0%': {
				zIndex: -1,
				opacity: 0,
				transform: 'translateY(32px)'
			},
			'100%': {
				zIndex: 999,
				opacity: 1,
				transform: 'translateY(0)'
			}
		},
		'@keyframes leave': {
			from: {
				zIndex: 999,
				opacity: 1,
				transform: 'translateY(0)'
			},
			to: {
				zIndex: -1,
				opacity: 0,
				transform: 'translateY(32px)'
			}
		}
	})
)

const _Window: React.ForwardRefRenderFunction<unknown, IWindowProps> = (props, ref) => {
	const {
		children,
		className,
		timeout = 150,
		in: inProp,
		onExited = () => {},
		...restProps
	} = props

	const classes = useStyles()

	useTransition({ in: inProp, onExited, timeout })

	const containerCls = clsx(classes.root, className, inProp ? classes.enter : classes.leave)

	return (
		<Paper {...restProps} ref={ref as any} className={containerCls}>
			{children}
		</Paper>
	)
}

const Window = React.forwardRef<unknown, IWindowProps>(_Window)

export default React.memo(Window)
