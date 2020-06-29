import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import ButtonBase from './ButtonBase'
import TouchRipple from '../TouchRipple'

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	disabled?: boolean
}

interface IStyleProps {
	color: IColors
	disabled: boolean
}

const useStyles = makeStyles(
	createStyles({
		btn: ({ color, disabled }: IStyleProps) => ({
			boxSizing: 'border-box',
			display: 'inline-block',
			position: 'relative',
			fontWeight: 500,
			whiteSpace: 'nowrap',
			textAlign: 'center',
			minWidth: 56,
			height: 32,
			background: color.main,
			padding: '4px 16px',
			borderRadius: 4,
			// default背景色太浅导致阴影明显，使得轮廓看起来比较大。单独调整下阴影
			boxShadow: `0 ${color.name === ThemeNames.DEFAULT ? '0 1px' : '1px 3px'} rgba(26,26,26,.1)`,
			color: color.text,
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'pointer',
			transition: 'all 0.2s ease-out',

			'&:hover': {
				background: disabled ? '' : color.dim
			}
		})
	})
)

const _Button: React.ForwardRefRenderFunction<unknown, IButtonProps> = (props, ref) => {
	const { children, className, color = ThemeNames.DEFAULT, disabled = false, ...restProps } = props
	const stylesProps: IStyleProps = { color: selectColor(color), disabled }
	const classes = useStyles(stylesProps)
	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple()
	const btnCls = clsx(classes.btn, className)

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
			{<TouchRipple ref={rippleRef} color={color} />}
			{children}
		</ButtonBase>
	)
}

const Button = React.forwardRef<unknown, IButtonProps>(_Button)

export default React.memo(Button)
