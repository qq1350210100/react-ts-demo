import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CaretDownFilled } from '@ant-design/icons'
import { TransitionGroup } from 'react-transition-group'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import DropList from './DropList'

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
	error?: boolean
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
		select: ({ dropVisible, color }: IStyleProps) => ({
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
			border: `1px solid ${dropVisible ? color.bright : '#e2e2e2'}`,
			color: dropVisible ? '#606266' : '#303133',
			transition: 'all 100ms'
		}),
		dropDownIcon: {
			color: '#606266',
			fontSize: 11,
			transform: ({ dropVisible }: IStyleProps) => (dropVisible ? 'rotate(180deg)' : 'rotate(0)'),
			transition: 'transform 100ms'
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
		error = false,
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

	return (
		<div className={containerCls}>
			<div className={classes.select} onClick={handleShowDrop}>
				{selected.desc}
				<span className={classes.dropDownIcon}>
					<CaretDownFilled />
				</span>
			</div>
			<TransitionGroup component={null}>
				{dropVisible && (
					<DropList selected={selected} handleChange={handleChange}>
						{children}
					</DropList>
				)}
			</TransitionGroup>
		</div>
	)
}

export default React.memo(Select)
