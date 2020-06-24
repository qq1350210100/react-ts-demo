import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { SearchOutlined } from '@ant-design/icons'
import { hex2Rgba } from 'utils'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import InputBase from './InputBase'

interface IInputProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	inputClassName?: string
	name?: string
	value?: string
	values?: any
	placeholder?: string
	type?: string
	color?: string
	disabled?: boolean
	onChange?: any
	onSearch?: (value: string) => void
}

interface IStyleProps {
	color: IColors
	focus: boolean
	disabled: boolean
	type: string
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
		input: ({ color, focus, disabled, type }: IStyleProps) => ({
			paddingRight: type === 'search' ? 32 : 8,
			border: `1px solid ${focus ? color.main : '#e5e5e5'}`,
			boxShadow: `0 0 0 ${focus ? '2px' : '6px'} ${hex2Rgba(color.main, focus ? 0.7 : 0)}`,
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'default'
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

const _Input: React.ForwardRefRenderFunction<unknown, IInputProps> = (props, ref) => {
	const {
		className,
		inputClassName,
		name,
		value = '',
		values = {},
		placeholder,
		type = 'input',
		color = ThemeNames.PRIMARY,
		disabled = false,
		onChange = () => {},
		onSearch = () => {},
		...rest
	} = props

	const [inputVal, setInputVal] = React.useState<string>('')
	const [focus, setFocus] = React.useState<boolean>(false)

	const styleProps: IStyleProps = { type, focus, disabled, color: selectColor(color) }
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

	const searchBtn = React.useMemo(() => {
		return type === 'search' ? (
			<div className={classes.searchIcon} onClick={handleSearch}>
				<SearchOutlined />
			</div>
		) : null
	}, [type, handleSearch])

	return (
		<div ref={ref as any} className={clsx(classes.root, className)}>
			<InputBase
				{...rest}
				className={clsx(classes.input, inputClassName)}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onChange={handleInputChange}
				type={type === 'password' ? type : 'text'}
				name={name}
				value={inputVal}
				disabled={disabled}
				placeholder={placeholder}
			/>
			{searchBtn}
		</div>
	)
}

const Input = React.forwardRef<unknown, IInputProps>(_Input)

export default React.memo(Input)
