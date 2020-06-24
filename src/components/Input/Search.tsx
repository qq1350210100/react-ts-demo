import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { SearchOutlined } from '@ant-design/icons'
import { hex2Rgba } from 'utils'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'

interface ISearchProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	inputClassName?: string
	name?: string
	value?: string
	values?: any
	placeholder?: string
	color?: string
	disabled?: boolean
	onChange?: any
	onSearch?: (value: string) => void
}

interface IStyleProps {
	color: IColors
	focus: boolean
	disabled: boolean
}

interface IFocus {
	(event: React.FocusEvent<HTMLElement>): void
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: 200,
			height: 30,
			minWidth: 200,
			minHeight: 28,
			position: 'relative'
		},
		input: ({ color, focus, disabled }: IStyleProps) => ({
			boxSizing: 'border-box',
			width: '100%',
			height: '100%',
			color: '#303133',
			background: '#fcfcfc',
			paddingLeft: 8,
			paddingRight: 32,
			borderRadius: 2,
			outline: 0,
			border: `1px solid ${focus ? color.main : '#e5e5e5'}`,
			boxShadow: `0 0 0 ${focus ? '2px' : '6px'} ${hex2Rgba(color.main, focus ? 0.7 : 0)}`,
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'default',
			transition: 'all 250ms ease-out',
			'&::placeholder': {
				color: '#aaa'
			}
		}),
		searchIcon: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
			position: 'absolute',
			right: 8,
			top: 0,
			fontSize: 15,
			cursor: 'pointer',
			color: '#606266'
		}
	})
)

const _Input: React.ForwardRefRenderFunction<unknown, ISearchProps> = (props, ref) => {
	const {
		className,
		inputClassName,
		name,
		value = '',
		values = {},
		placeholder,
		color = ThemeNames.PRIMARY,
		disabled = false,
		onChange = () => {},
		onSearch = () => {},
		...rest
	} = props

	const [inputVal, setInputVal] = React.useState<string>('')
	const [focus, setFocus] = React.useState<boolean>(false)

	const styleProps: IStyleProps = { focus, disabled, color: selectColor(color) }
	const classes = useStyles(styleProps)

	const handleInputFocus: IFocus = React.useCallback(e => {
		rest.onFocus && rest.onFocus(e)
		setFocus(true)
	}, [])

	const handleInputBlur: IFocus = React.useCallback(e => {
		rest.onBlur && rest.onBlur(e)
		setFocus(false)
	}, [])

	const handleInputChange = React.useCallback(
		e => {
			const keywords = e.target.value
			setInputVal(keywords)
			onChange && onChange(keywords, values)
		},
		[onChange, values]
	)

	const handleSearch = React.useCallback(() => {
		onSearch && onSearch(inputVal)
	}, [inputVal])

	React.useEffect(() => {
		setInputVal(value)
	}, [value])

	const searchBtn = React.useMemo(
		() => (
			<div className={classes.searchIcon} onClick={handleSearch}>
				<SearchOutlined />
			</div>
		),
		[handleSearch]
	)

	return (
		<div ref={ref as any} className={clsx(classes.root, className)}>
			<input
				{...rest}
				type="text"
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onChange={handleInputChange}
				name={name}
				value={inputVal}
				disabled={disabled}
				className={clsx(classes.input, inputClassName)}
				placeholder={placeholder}
			/>
			{searchBtn}
		</div>
	)
}

const Input = React.forwardRef<unknown, ISearchProps>(_Input)

export default React.memo(Input)
