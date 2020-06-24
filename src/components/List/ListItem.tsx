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
	to?: string
	linked?: boolean
}

interface IStyleProps {
	color: IColors
	bordered: boolean
}

const useStyles = makeStyles(
	createStyles({
		listItem: ({ color, bordered }: IStyleProps) => ({
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			width: '100%',
			minHeight: 40,
			padding: '0 24px',
			margin: 0,
			borderBottom: bordered ? '1px solid #f0f0f0' : 0,
			borderRadius: bordered ? 0 : 2,
			textDecoration: 'none',
			color: '#303133',
			transition: 'all .15s ease-out',

			'&:hover': {
				background: color.main
			},

			'&:first-child': {
				borderTopLeftRadius: 2,
				borderTopRightRadius: 2
			},

			'&:last-child': {
				borderBottom: 0,
				borderBottomLeftRadius: 2,
				borderBottomRightRadius: 2
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
		to = '/',
		linked = false
	} = props

	const classes = useStyles({
		color: selectColor(color),
		bordered
	})

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
		[className, onClick, handleStart, handleStop]
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
