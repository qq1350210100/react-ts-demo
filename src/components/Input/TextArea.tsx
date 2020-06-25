import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { hex2Rgba } from 'utils'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import { TextAreaBase } from './baseComponents'

export interface ITextAreaProps extends React.HTMLAttributes<HTMLElement> {
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
	onPressEnter?: (value: string) => void
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

enum TextAreaTypes {
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
			height: 48,
			minWidth: 200,
			minHeight: 48,
			position: 'relative'
		},
		textarea: ({ color, focus, disabled }: IStyleProps) => ({
			paddingRight: 8,
			border: `1px solid ${focus ? color.main : '#e5e5e5'}`,
			boxShadow: `0 0 0 ${focus ? '2px' : '6px'} ${hex2Rgba(color.main, focus ? 0.7 : 0)}`,
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'default'
		})
	})
)

const _TextArea: React.ForwardRefRenderFunction<unknown, ITextAreaProps> = (props, ref) => {
	const {
		className,
		inputClassName,
		name,
		value = '',
		values = {},
		placeholder,
		type = TextAreaTypes.TEXT,
		color = ThemeNames.PRIMARY,
		disabled = false,
		enterButton = null,
		onChange = () => {},
		onPressEnter = () => {},
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

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.keyCode === 13) {
				onPressEnter && onPressEnter(inputVal)
			}
		},
		[inputVal, onPressEnter]
	)

	React.useEffect(() => {
		setInputVal(value)
	}, [value])

	const containerCls = clsx(classes.root, className)
	const textareaCls = clsx(classes.textarea, inputClassName)

	return (
		<div ref={ref as any} className={containerCls}>
			<TextAreaBase
				{...restProps}
				className={textareaCls}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onKeyDown={handleKeyDown}
				onChange={handleInputChange}
				name={name}
				value={inputVal}
				disabled={disabled}
				placeholder={placeholder}
			/>
		</div>
	)
}

const TextArea = React.forwardRef<unknown, ITextAreaProps>(_TextArea)

export default React.memo(TextArea)
