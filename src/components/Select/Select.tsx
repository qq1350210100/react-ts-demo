import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CaretDownFilled } from '@ant-design/icons'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import Option from './Option'
import GroundGlass from '../GroundGlass'

export interface ISelectProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	timeout?: number
	_onChange?: (value?: string) => void
}

interface IStyleProps {
	color: IColors
	timeout: number
	listVisible: boolean
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
			background: '#fafafa',
			paddingLeft: 8,
			paddingRight: 8,
			borderRadius: 2,
			border: '1px solid #e2e2e2',
			'&>i': {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: 12,
				color: '#303133'
			}
		},
		optionWrapper: ({ listVisible, timeout }: IStyleProps) => ({
			width: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
			borderRadius: 2,
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			overflow: 'hidden',
			zIndex: listVisible ? 999 : -1,
			opacity: listVisible ? 1 : 0,
			transition: `all ${timeout}ms ease-out`,
			transformOrigin: '50% 16px'
		}),
		firstOption: ({ color }: IStyleProps) => ({
			color: color.main
		}),
		enter: {
			animation: '$kf_enter ease-out',
			animationDuration: ({ timeout }: IStyleProps) => `${timeout}ms`
		},
		'@keyframes kf_enter': {
			'0%': {
				opacity: 0,
				transform: 'scale(.6)'
			},
			'100%': {
				opacity: 1,
				transform: 'scale(1)'
			}
		}
	})
)

const Select: React.FC<ISelectProps> = props => {
	const {
		children,
		className,
		color = ThemeNames.PRIMARY,
		timeout = 200,
		_onChange = () => {},
		...restProps
	} = props

	const [listVisible, setListVisible] = useState<boolean>(false)
	const [values, setValues] = React.useState<any[]>([])
	const [childrens, setChildrens] = React.useState<any[]>([])
	const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

	const handleShowList = () => {
		setListVisible(true)
	}
	const handleHideList = () => {
		setListVisible(false)
	}

	const styleProps: IStyleProps = {
		listVisible,
		timeout,
		color: selectColor(color)
	}
	const classes = useStyles(styleProps)

	const refs: any = React.useMemo(() => React.Children.map(children, () => React.createRef()), [
		children
	])

	console.log('refs', refs)

	const selected = React.useMemo(
		() => ({
			value: values[selectedIndex],
			children: childrens[selectedIndex]
		}),
		[values, childrens, selectedIndex]
	)

	// console.log('selected', selected)
	// console.log('selectedIndex', selectedIndex)

	React.useEffect(() => {
		const values = refs.map(ref => ref.current.value)
		console.log('values: ', values)
		const childrens = refs.map(ref => ref.current.children)
		console.log('childrens: ', childrens)
		setValues(values)
		setChildrens(childrens)
	}, [refs])

	React.useEffect(() => {
		listVisible && document.addEventListener('click', handleHideList)
		return () => {
			document.removeEventListener('click', handleHideList)
		}
	}, [listVisible, handleHideList])

	const handleChange = value => {
		console.log('value: ', value)
		setSelectedIndex(values.indexOf(value))
		_onChange && _onChange(value)
	}

	return (
		<div className={clsx(classes.root, className)}>
			<div {...restProps} className={classes.selected} onClick={handleShowList}>
				{listVisible ? null : (
					<>
						{selected.children}
						<CaretDownFilled />
					</>
				)}
			</div>
			{
				<GroundGlass className={clsx(classes.optionWrapper, listVisible && classes.enter)}>
					<Option className={classes.firstOption} value={selected.value}>
						{selected.children}
					</Option>
					{children &&
						React.Children.map(children, (child: any, index) =>
							React.cloneElement(child, {
								ref: refs[index],
								handleChange,
								isCurrent: index === selectedIndex,
								timeout
							})
						)}
				</GroundGlass>
			}
		</div>
	)
}

export default Select
