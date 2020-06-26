import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CaretDownFilled } from '@ant-design/icons'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import Collapse from '../Collapse'
import List from '../List'

interface INavMenuProps {
	color?: string
	menuOptions?: IMenuOptions[]
	paddingLeft?: number
	onSelect?: (id: number) => void
}

interface IStyleProps {
	color: IColors
	paddingLeft: number
}

export interface IMenuOptions {
	id?: number
	name?: string
	path?: string
	icon?: React.ReactElement | null
	component?: React.ReactElement | null
	childs?: IMenuOptions[]
}

interface IOpenStatus {
	[key: string]: boolean
}

interface ISuperItem extends IMenuOptions {
	opened: boolean
}

interface ISubItem extends ISuperItem {
	superId: number
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
			fontWeight: 'bolder'
		},
		subItem: ({ paddingLeft }: IStyleProps) => ({
			textDecoration: 'none',
			color: '#303133',
			paddingLeft
		}),
		subsWrapper: {
			minHeight: 0,
			transition: 'height 250ms ease-out'
		},
		icon: {
			marginRight: 8
		},
		arrowIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			height: '100%',
			fontSize: 11,
			position: 'absolute',
			top: 0,
			right: 16,
			transition: 'transform 250ms ease-out'
		},
		arrowIconSelected: {
			transform: 'rotate(180deg)'
		},
		actived: ({ color }: IStyleProps) => ({
			fontWeight: 'bolder',
			textDecoration: 'none',
			color: color.text,
			background: color.bright,

			'&:hover': {
				color: color.text,
				background: color.bright
			}
		})
	})
)

const NavMenu: React.FC<INavMenuProps> = props => {
	const {
		menuOptions = [],
		color = ThemeNames.PRIMARY,
		paddingLeft = 48,
		onSelect = () => {}
	} = props

	const defaultChildOpenStatus = React.useMemo(() => {
		const defaultObj = {}
		menuOptions.forEach(({ id }) => {
			if (id) {
				defaultObj[id] = false
			}
		})
		return defaultObj
	}, [menuOptions])

	// 内部维护一个菜单展开状态
	const [childOpenStatus, setChildOpenStatus] = React.useState<IOpenStatus>(defaultChildOpenStatus)

	const styleProps: IStyleProps = {
		color: selectColor(color),
		paddingLeft
	}
	const classes = useStyles(styleProps)

	const handleSelect = React.useCallback(
		(id?: number) => {
			id && onSelect && onSelect(id)
		},
		[onSelect]
	)

	const handleToggleChildOpen = React.useCallback(
		(id?: number) => {
			if (id) {
				handleSelect(id)
				setChildOpenStatus(prev => ({
					...prev,
					[id]: !prev[id]
				}))
			}
		},
		[handleSelect]
	)

	const renderArrowIcon = React.useCallback(
		opened => (
			<CaretDownFilled className={clsx(classes.arrowIcon, opened && classes.arrowIconSelected)} />
		),
		[classes]
	)

	const renderSuperMenu = React.useCallback(
		(superItem: ISuperItem) => {
			const { id, name, path, childs, icon, opened } = superItem
			return (
				<List.Item
					className={classes.superItem}
					activeClassName={classes.actived}
					bordered={false}
					textColor={color}
					linked={!childs}
					to={path}
					onClick={childs ? () => handleToggleChildOpen(id) : () => handleSelect(id)}
				>
					{icon && <span className={classes.icon}>{icon}</span>}
					<span>{name}</span>
					{childs && renderArrowIcon(opened)}
				</List.Item>
			)
		},
		[handleToggleChildOpen, handleSelect]
	)

	const renderSubMenu = React.useCallback((subItem: ISubItem) => {
		const { path = '', childs = [], opened, superId } = subItem
		return (
			<Collapse className={classes.subsWrapper} visible={opened}>
				{childs.map((child: IMenuOptions) => {
					const { id, name, icon, path: childPath = '' } = child
					const fianllyPath = path + childPath
					const finallyId = Number(`${superId}${id}`)
					return (
						<List.Item
							key={id}
							className={classes.subItem}
							activeClassName={classes.actived}
							textColor={color}
							bordered={false}
							linked
							to={fianllyPath}
							onClick={() => handleSelect(finallyId)}
						>
							{icon && <span className={classes.icon}>{icon}</span>}
							<span>{name}</span>
						</List.Item>
					)
				})}
			</Collapse>
		)
	}, [])

	return (
		<List className={classes.root}>
			{menuOptions.map((item: IMenuOptions) => {
				const { id = 0, childs } = item
				const opened = childOpenStatus[id]
				const superItem: ISuperItem = { ...item, opened }
				const subItem: ISubItem = { ...item, opened, superId: id }

				return (
					<React.Fragment key={id}>
						{renderSuperMenu(superItem)}
						{childs && renderSubMenu(subItem)}
					</React.Fragment>
				)
			})}
		</List>
	)
}

export default React.memo(NavMenu)
