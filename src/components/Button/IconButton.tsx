import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'

export interface IStyleProps {
	color: IColors
	focus?: boolean
	disabled?: boolean
}

export interface IIconButtonProps extends React.ButtonHTMLAttributes<any> {
	className?: string
	color?: string
	focus?: boolean
	disabled?: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: ({ color, focus, disabled }: IStyleProps) => ({
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

const IconButton: React.FC<IIconButtonProps> = props => {
	const {
		children,
		className,
		color = ThemeNames.DEFAULT,
		disabled = false,
		focus = false,
		...rest
	} = props
	const stylesProps: IStyleProps = { color: selectColor(color), focus, disabled }
	const classes = useStyles(stylesProps)
	const btnCls = clsx(classes.root, className)

	return (
		<button type="button" {...rest} className={btnCls}>
			{children}
		</button>
	)
}

export default React.memo(IconButton)
