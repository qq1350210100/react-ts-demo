import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import TouchRipple from '../TouchRipple'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'

export interface IListItemProps extends React.LiHTMLAttributes<HTMLElement> {
	className?: string
	activeClassName?: string
	bordered?: boolean
	rippleMuted?: boolean
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | null
	color?: string
	textColor?: string
	to?: string
	linked?: boolean
}

interface IStyleProps {
	color: IColors
	textColor: IColors | null
	bordered: boolean
}

const useStyles = makeStyles(
	createStyles({
		listItem: ({ color, textColor, bordered }: IStyleProps) => ({
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			width: '100%',
			minHeight: 40,
			padding: '0 24px',
			margin: 0,
			borderBottom: bordered ? '1px solid #f0f0f0' : 0,
			borderRadius: bordered ? 0 : 4,
			textDecoration: 'none',
			color: '#303133',
			transition: 'all .15s ease-out',

			'&:hover': {
				color: '#303133',
				background: 'rgba(160, 160, 160, .1)'
				// color: textColor
				// 	? textColor.name === ThemeNames.DEFAULT
				// 		? '#000'
				// 		: textColor.main
				// 	: color.text
			},

			'&:first-child': {
				borderTopLeftRadius: 4,
				borderTopRightRadius: 4
			},

			'&:last-child': {
				borderBottom: 0,
				borderBottomLeftRadius: 4,
				borderBottomRightRadius: 4
			}
		})
	})
)

const ListItem: React.FC<IListItemProps> = props => {
	const {
		children,
		className,
		activeClassName = '',
		bordered = true,
		rippleMuted = false,
		onClick = null,
		color = ThemeNames.DEFAULT,
		textColor = null,
		to = '/',
		linked = false
	} = props

	const styleProps: IStyleProps = {
		color: selectColor(color),
		textColor: textColor ? selectColor(textColor) : null,
		bordered
	}
	const classes = useStyles(styleProps)

	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple(rippleMuted)

	// 公用props
	const commonProps = React.useMemo(
		() => ({
			className: clsx(classes.listItem, className),
			onClick,
			onMouseDown: handleStart,
			onMouseUp: handleStop,
			onMouseLeave: handleStop
		}),
		[classes.listItem, className, onClick, handleStart, handleStop]
	)

	const renderNavItem = () => (
		<NavLink {...commonProps} to={to} exact={to === '/'} activeClassName={activeClassName}>
			<TouchRipple ref={rippleRef} color={color} />
			{children}
		</NavLink>
	)

	const renderItem = () => (
		<li {...(commonProps as any)}>
			<TouchRipple ref={rippleRef} color={color} />
			{children}
		</li>
	)

	return linked ? renderNavItem() : renderItem()
}

export default React.memo(ListItem)
