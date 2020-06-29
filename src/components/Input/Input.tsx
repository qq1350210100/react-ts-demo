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
	error?: boolean
	placeholder?: string
	type?: string
	color?: string
	disabled?: boolean
	enterButton?: React.ReactNode | null
	onChange?: (event: React.FormEvent<HTMLElement>, name?: string) => void
	onSearch?: (value: string) => void
}

interface IStyleProps {
	color: IColors
	focus: boolean
	disabled: boolean
	error: boolean
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
			height: 32,
			minWidth: 200,
			minHeight: 32,
			position: 'relative'
		},
		input: ({ color, focus, disabled, error, type }: IStyleProps) => {
			const errorColor = selectColor(ThemeNames.ERROR)
			const bdColor = error ? errorColor.main : focus ? color.main : '#e5e5e5'
			const bdWidth = focus ? '2px' : '6px'
			const bxsColor = hex2Rgba(error ? errorColor.main : color.main, focus ? 0.7 : 0)
			return {
				paddingRight: type === InputTypes.SEARCH ? 32 : 8,
				border: `1px solid ${bdColor}`,
				boxShadow: `0 0 0 ${bdWidth} ${bxsColor}`,
				opacity: disabled ? 0.5 : 1,
				cursor: disabled ? 'not-allowed' : 'default'
			}
		}
	})
)

const _Input: React.ForwardRefRenderFunction<unknown, IInputProps> = (props, ref) => {
	const {
		className,
		inputClassName,
		name,
		value = '',
		error = false,
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

	const styleProps: IStyleProps = { type, focus, disabled, error, color: selectColor(color) }
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
			onChange && onChange(keywords, name)
		},
		[onChange, name]
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

export default React.memo(Input)
