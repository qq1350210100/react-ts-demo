import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CaretDownFilled } from '@ant-design/icons'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import Option from './Option'
import GroundGlass from '../GroundGlass'

export interface ISelectOption {
	value: string
	desc: string
}

export interface ISelectProps {
	children: any
	className?: string
	name?: string
	color?: string
	defaultValue?: string
	value?: string
	onChange?: (value?: string, name?: string) => void
}

interface IStyleProps {
	color: IColors
	dropVisible: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: {
			minWidth: 104,
			minHeight: 32,
			position: 'relative',
			cursor: 'pointer',
			userSelect: 'none'
		},
		selected: {
			boxSizing: 'border-box',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			height: 32,
			background: '#fcfcfc',
			paddingLeft: 8,
			paddingRight: 8,
			borderRadius: 4,
			border: '1px solid #e2e2e2'
		},
		dropDownIcon: {
			fontSize: 11,
			paddingLeft: 16
		},
		dropList: ({ dropVisible }: IStyleProps) => ({
			width: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
			padding: 0,
			borderRadius: 4,
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			overflow: 'hidden',
			zIndex: dropVisible ? 999 : -1,
			opacity: dropVisible ? 1 : 0,
			transformOrigin: '50% 0'
		}),
		currentSelected: ({ color }: IStyleProps) => ({
			color: color.main,
			background: color.ripple,

			'&:hover': {
				background: color.ripple
			}
		}),
		enter: {
			animation: '$kf_enter ease-out',
			animationDuration: '200ms'
		},
		'@keyframes kf_enter': {
			'0%': {
				transform: 'scale(.6)'
			},
			'100%': {
				transform: 'scale(1)'
			}
		}
	})
)

const Select: React.FC<ISelectProps> = props => {
	const {
		children,
		className,
		name,
		defaultValue = '',
		color = ThemeNames.PRIMARY,
		value = defaultValue,
		onChange = () => {}
	} = props

	const defaultOption = { desc: '', value: '' }
	const [selected, setSelected] = React.useState<ISelectOption>(defaultOption)
	const [dropVisible, setDropVisible] = React.useState<boolean>(false)

	const handleShowDrop = () => {
		setDropVisible(true)
	}

	const handleHideDrop = () => {
		setDropVisible(false)
	}

	const handleChange = React.useCallback(
		(option: ISelectOption) => {
			setSelected(option)
			onChange && onChange(option.value, name)
			handleHideDrop()
		},
		[onChange, handleHideDrop, name]
	)

	const styleProps: IStyleProps = {
		dropVisible,
		color: selectColor(color)
	}
	const classes = useStyles(styleProps)

	const handleSetOption = value => {
		if (children) {
			React.Children.forEach(children, (child: JSX.Element) => {
				if (child?.props?.value === value) {
					setSelected({
						desc: child.props.children,
						value
					})
				}
			})
		}
	}

	React.useEffect(() => {
		if (defaultValue) {
			handleSetOption(defaultValue)
		}
	}, [defaultValue])

	React.useEffect(() => {
		handleSetOption(value)
	}, [value])

	React.useEffect(() => {
		if (dropVisible) {
			document.addEventListener('click', handleHideDrop)
		}
		return () => {
			document.removeEventListener('click', handleHideDrop)
		}
	}, [dropVisible, handleHideDrop])

	const containerCls = clsx(classes.root, className)
	const dropListCls = clsx(classes.dropList, dropVisible && classes.enter)

	const renderCurrentSelected = (desc: string) => (
		<div className={classes.selected} onClick={handleShowDrop}>
			{desc}
			<span className={classes.dropDownIcon}>
				<CaretDownFilled />
			</span>
		</div>
	)

	const renderDropList = (selected: ISelectOption) => (
		<GroundGlass className={dropListCls}>
			<Option className={classes.currentSelected} value={selected.value}>
				{selected.desc}
			</Option>
			{children &&
				React.Children.map(children, (child: JSX.Element) => {
					if (child.props.value !== selected.value) {
						return React.cloneElement(child, { handleChange })
					}
				})}
		</GroundGlass>
	)

	return (
		<div className={containerCls}>
			{renderCurrentSelected(selected.desc)}
			{renderDropList(selected)}
		</div>
	)
}

export default React.memo(Select)
