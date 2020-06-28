import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { hex2Rgba } from 'utils'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import { InputBase } from './baseComponents'
import SearchBtn from './SearchBtn'

export interface IInputProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	inputClassName?: string
	name?: string
	value?: string
	values?: any
	placeholder?: string
	type?: string
	color?: string
	disabled?: boolean
	enterButton?: React.ReactNode | null
	onChange?: (event: React.FormEvent<HTMLElement>) => void
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

enum InputTypes {
	TEXT = 'text',
	PASSWORD = 'password',
	SEARCH = 'search'
}

const useStyles = makeStyles(
	createStyles({
		root: {
			// Input.Group compact用到，防止box-shadow被遮挡
			zIndex: ({ focus }: IStyleProps) => (focus ? 1 : 0),
			width: 200,
			height: 30,
			minWidth: 200,
			minHeight: 28,
			position: 'relative'
		},
		input: ({ color, focus, disabled, type }: IStyleProps) => ({
			paddingRight: type === InputTypes.SEARCH ? 32 : 8,
			border: `1px solid ${focus ? color.main : '#e5e5e5'}`,
			boxShadow: `0 0 0 ${focus ? '2px' : '6px'} ${hex2Rgba(color.main, focus ? 0.7 : 0)}`,
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'default'
		})
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
		type = InputTypes.TEXT,
		color = ThemeNames.PRIMARY,
		disabled = false,
		enterButton = null,
		onChange = () => {},
		onSearch = () => {},
		...restProps
	} = props
	const { onFocus, onBlur } = restProps

	const [inputVal, setInputVal] = React.useState<string>('')
	const [focus, setFocus] = React.useState<boolean>(false)

	const styleProps: IStyleProps = { type, focus, disabled, color: selectColor(color) }
	const classes = useStyles(styleProps)

	const handleInputFocus: IFocus = React.useCallback(
		e => {
			onFocus && onFocus(e)
			setFocus(true)
		},
		[onFocus]
	)

	const handleInputBlur: IFocus = React.useCallback(
		e => {
			onBlur && onBlur(e)
			setFocus(false)
		},
		[onBlur]
	)

	const handleInputChange = React.useCallback(
		e => {
			const keywords = e.target.value
			setInputVal(keywords)
			onChange && onChange(keywords)
		},
		[onChange, values]
	)

	const handleSearch = React.useCallback(() => {
		onSearch && onSearch(inputVal)
	}, [inputVal, onSearch])

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.keyCode === 13) {
				onSearch && onSearch(inputVal)
			}
		},
		[inputVal, onSearch]
	)

	React.useEffect(() => {
		setInputVal(value)
	}, [value])

	const suffix = type === InputTypes.SEARCH && (
		<SearchBtn onSearch={handleSearch} enterButton={enterButton} />
	)

	const containerCls = clsx(classes.root, className)
	const inputCls = clsx(classes.input, inputClassName)

	return (
		<div ref={ref as any} className={containerCls}>
			<InputBase
				{...restProps}
				className={inputCls}
				type={type === InputTypes.PASSWORD ? type : InputTypes.TEXT}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onKeyDown={handleKeyDown}
				onChange={handleInputChange}
				name={name}
				value={inputVal}
				disabled={disabled}
				placeholder={placeholder}
			/>
			{suffix}
		</div>
	)
}

const Input = React.forwardRef<unknown, IInputProps>(_Input)

export default Input
