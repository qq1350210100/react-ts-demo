import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { TransitionGroup } from 'react-transition-group'
import Ripple, { IRippleProps } from './Ripple'

interface Rect {
	width: number
	height: number
	left: number
	top: number
}

export interface ITouchRippleProps extends React.RefAttributes<HTMLElement> {
	centered?: boolean
	timeout?: number
	color?: string
}

const useStyles = makeStyles(
	createStyles({
		touchRipple: {
			overflow: 'hidden',
			pointerEvents: 'none',
			position: 'absolute',
			zIndex: 0,
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			borderRadius: 'inherit'
		}
	})
)

const _TouchRipple: React.ForwardRefRenderFunction<unknown, ITouchRippleProps> = (props, ref) => {
	const { centered = false, timeout = 400, color = 'default' } = props

	const [ripples, setRipples] = React.useState<React.FC<IRippleProps>[]>([])
	const key = React.useRef(0)
	const container: React.RefObject<any> = React.useRef()
	const classes = useStyles()

	const addRipple = React.useCallback(
		(rippleX, rippleY, rippleSize) => {
			setRipples((oldRipples: any) => [
				...oldRipples,
				<Ripple
					key={key.current}
					rippleX={rippleX}
					rippleY={rippleY}
					rippleSize={rippleSize}
					timeout={timeout}
					color={color}
				/>
			])
			key.current++
		},
		[color, timeout]
	)

	const start = React.useCallback(
		e => {
			const element = container.current

			const rect: Rect | ClientRect = element
				? element.getBoundingClientRect()
				: {
						width: 0,
						height: 0,
						left: 0,
						top: 0
				  }

			let rippleX: number
			let rippleY: number
			let rippleSize: number

			if (centered) {
				rippleX = Math.round(rect.width / 2)
				rippleY = Math.round(rect.height / 2)
				rippleSize = Math.round(Math.sqrt(4 * (rippleX ** 2 + rippleY ** 2)))
			} else {
				rippleX = Math.round(e.clientX - rect.left)
				rippleY = Math.round(e.clientY - rect.top)

				const sizeX = Math.max(Math.abs(rect.width - rippleX), rippleX) * 2
				const sizeY = Math.max(Math.abs(rect.height - rippleY), rippleY) * 2

				rippleSize = Math.round(Math.sqrt(sizeX ** 2 + sizeY ** 2))
			}

			addRipple(rippleX, rippleY, rippleSize)
		},
		[addRipple, centered]
	)

	const stop = React.useCallback(() => {
		setRipples((oldRipples: any) => (oldRipples.length > 0 ? oldRipples.slice(1) : oldRipples))
	}, [])

	// 自组件暴露方法给父组件
	React.useImperativeHandle(ref, () => ({ start, stop }), [start, stop])

	return (
		<span ref={container} className={classes.touchRipple}>
			<TransitionGroup component={null}>{ripples}</TransitionGroup>
		</span>
	)
}

const TouchRipple = React.forwardRef<unknown, ITouchRippleProps>(_TouchRipple)

export default React.memo(TouchRipple)
