import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'

interface IOptionProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	timeout?: number
	value?: string
	isCurrent?: boolean
	handleChange?: (value?: string) => void
}

interface IStyleProps {
	color: IColors
	timeout: number
	isCurrent: boolean
}

const useStyles = makeStyles({
	root: ({ color, isCurrent }: IStyleProps) => ({
		display: isCurrent ? 'none' : 'flex',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
		height: 32,
		paddingLeft: 8,
		transition: 'all .1s',

		'&:hover': {
			background: color.main
		}
	})
})

const _Option: React.ForwardRefRenderFunction<unknown, IOptionProps> = (props, ref) => {
	const {
		className,
		children,
		value,
		handleChange = () => {},
		color = ThemeNames.DEFAULT,
		timeout = 0,
		isCurrent = false
	} = props

	const styleProps: IStyleProps = {
		timeout,
		isCurrent,
		color: selectColor(color)
	}
	const classes = useStyles(styleProps)

	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple()

	React.useImperativeHandle(
		ref,
		() => ({
			value,
			children
		}),
		[value, children]
	)

	const handleSelect = React.useCallback(() => {
		setTimeout(() => {
			handleChange(value)
		}, timeout)
	}, [value])

	return (
		<div
			className={clsx(classes.root, className)}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			onMouseLeave={handleStop}
			onClick={handleSelect}
		>
			<TouchRipple ref={rippleRef} color={color} />
			{children}
		</div>
	)
}

const Option = React.forwardRef<unknown, IOptionProps>(_Option)

export default React.memo(Option)
