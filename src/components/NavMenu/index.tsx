import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { DownOutlined } from '@ant-design/icons'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import Collapse from '../Collapse'
import List from '../List'

interface INavMenuProps {
	color?: string
	menuOptions?: any[]
	paddingLeft?: number
}

interface IStyleProps {
	color: IColors
	paddingLeft: number
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: '100%',
			overflowY: 'auto',
			cursor: 'pointer',
			userSelect: 'none'
		},
		superItem: {
			fontWeight: 500
		},
		childWrapper: {
			minHeight: 0,
			transition: 'height 250ms ease-out'
		},
		subItem: ({ paddingLeft }: IStyleProps) => ({
			textDecoration: 'none',
			color: '#303133',
			paddingLeft,
			'&>svg': {
				marginRight: 24,
				fontSize: 16
			}
		}),
		arrowIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			height: '100%',
			fontSize: 12,
			position: 'absolute',
			top: 0,
			right: 16,
			transition: 'transform 250ms ease-out'
		},
		arrowIconSelected: {
			transform: 'rotate(180deg)'
		},
		superItemActived: ({ color }: IStyleProps) => ({
			textDecoration: 'none',
			color: color.main,
			fontWeight: 500
		}),
		subItemActived: ({ color }: IStyleProps) => ({
			textDecoration: 'none',
			color: color.main
		})
	})
)

const NavMenu: React.FC<INavMenuProps> = props => {
	const { menuOptions = [], color = ThemeNames.PRIMARY, paddingLeft = 44 } = props

	const defaultChildOpenStatus = React.useMemo(() => {
		let defaultObj = {}
		menuOptions.forEach(({ id }) => {
			defaultObj[id] = false
		})
		return defaultObj
	}, [menuOptions])

	// 内部维护一个菜单展开状态
	const [childOpenStatus, setChildOpenStatus] = React.useState(defaultChildOpenStatus)

	const styleProps: IStyleProps = {
		color: selectColor(color),
		paddingLeft
	}
	const classes = useStyles(styleProps)

	const handleToggleChildOpen = React.useCallback(
		id => {
			setChildOpenStatus(prev => ({
				...prev,
				[id]: !prev[id]
			}))
		},
		[setChildOpenStatus]
	)

	const renderArrowIcon = opened => (
		<DownOutlined className={clsx(classes.arrowIcon, opened && classes.arrowIconSelected)} />
	)

	const renderSuperMenu = React.useCallback(
		({ id, name, path, child, icon, opened }) => (
			<List.Item
				className={classes.superItem}
				activeClassName={classes.superItemActived}
				bordered={false}
				textColor={color}
				linked={!child}
				to={path}
				onClick={child ? () => handleToggleChildOpen(id) : () => {}}
			>
				{icon}
				<span>{name}</span>
				{child && renderArrowIcon(opened)}
			</List.Item>
		),
		[handleToggleChildOpen]
	)

	const renderSubMenu = React.useCallback(
		({ path, child, opened }) => (
			<Collapse className={classes.childWrapper} visible={opened}>
				{child.map(({ id, name, path: childPath, icon }) => (
					<List.Item
						key={id}
						className={classes.subItem}
						activeClassName={classes.subItemActived}
						linked
						to={path + childPath}
						textColor={color}
						bordered={false}
					>
						{icon}
						<span>{name}</span>
					</List.Item>
				))}
			</Collapse>
		),
		[]
	)

	return (
		<List className={classes.root}>
			{menuOptions.map(item => {
				const { id, path, child } = item
				const opened = childOpenStatus[id]
				const superItem = { ...item, opened }
				const subItem = { path, child, opened }

				return (
					<React.Fragment key={id}>
						{renderSuperMenu(superItem)}
						{child && renderSubMenu(subItem)}
					</React.Fragment>
				)
			})}
		</List>
	)
}

export default React.memo(NavMenu)
