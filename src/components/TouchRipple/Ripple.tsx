import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import { useTransition, ITransitionOpts } from 'common/hooks'

export interface IRippleProps extends ITransitionOpts {
	rippleX: number
	rippleY: number
	rippleSize: number
	color?: string
}

interface IStyleProps {
	styles: Rect | object
	timeout: number
	color: IColors
}

interface Rect {
	width: number
	height: number
	left: number
	top: number
}

const useStyles = makeStyles(
	createStyles({
		ripple: ({ styles }: IStyleProps) => ({
			position: 'absolute',
			...styles
		}),
		child: {
			display: 'block',
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			background: ({ color }) => color.ripple
		},
		enter: {
			animation: '$kf_enter ease-out forwards',
			animationDuration: ({ timeout }) => `${timeout}ms`
		},
		leave: {
			animation: '$kf_leave ease-out forwards',
			animationDuration: ({ timeout }) => `${timeout}ms`
		},
		'@keyframes kf_enter': {
			from: {
				transform: 'scale(0)',
				opacity: 0.1
			},
			to: {
				transform: 'scale(1)',
				opacity: 0.4
			}
		},
		'@keyframes kf_leave': {
			from: {
				opacity: 1
			},
			to: {
				opacity: 0
			}
		}
	})
)

const Ripple: React.FC<IRippleProps> = props => {
	const {
		rippleX,
		rippleY,
		rippleSize,
		in: inProp,
		onExited = () => {},
		color = ThemeNames.DEFAULT,
		timeout = 0
	} = props

	const styles: Rect = {
		width: rippleSize,
		height: rippleSize,
		left: rippleX - rippleSize / 2,
		top: rippleY - rippleSize / 2
	}

	const [leave, setLeave] = React.useState<boolean>(false)
	const styleProps: IStyleProps = { styles, timeout, color: selectColor(color) }
	const classes = useStyles(styleProps)

	useTransition({
		onExited,
		timeout,
		in: inProp,
		callback: () => {
			setLeave(true)
		}
	})

	return (
		<span className={clsx(classes.ripple, classes.enter)}>
			<span className={clsx(classes.child, leave && classes.leave)}></span>
		</span>
	)
}

export default React.memo(Ripple)
