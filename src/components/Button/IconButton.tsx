import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import ButtonBase from './ButtonBase'
import TouchRipple from '../TouchRipple'

export interface IStyleProps {
	color: IColors
	focus: boolean
	disabled: boolean
}

export interface IIconButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	focus?: boolean
	disabled?: boolean
}

const useStyles = makeStyles(
	createStyles({
		iconBtn: ({ color, focus, disabled }: IStyleProps) => ({
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
			whiteSpace: 'nowrap',
			width: 40,
			height: 40,
			color: color.text,
			fontSize: 16,
			background: focus ? 'rgba(120,120,120,.1)' : 'transparent',
			outline: 0,
			border: 0,
			borderRadius: '50%',
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'pointer',
			transition: 'all 0.25s ease-out',

			'&:hover': {
				background: disabled ? '' : color.dim
			}
		})
	})
)

const _IconButton: React.ForwardRefRenderFunction<unknown, IIconButtonProps> = (props, ref) => {
	const {
		children,
		className,
		color = ThemeNames.DEFAULT,
		disabled = false,
		focus = false,
		...restProps
	} = props
	const stylesProps: IStyleProps = { color: selectColor(color), focus, disabled }
	const classes = useStyles(stylesProps)
	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple()
	const btnCls = clsx(classes.iconBtn, className)

	return (
		<ButtonBase
			type="button"
			{...restProps}
			ref={ref as any}
			className={btnCls}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			onMouseLeave={handleStop}
		>
			<TouchRipple ref={rippleRef} color={color} centered timeout={500} />
			{children}
		</ButtonBase>
	)
}

const IconButton = React.forwardRef<unknown, IIconButtonProps>(_IconButton)

export default React.memo(IconButton)
