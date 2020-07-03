import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import { ISelectOption } from './Select'

interface IOptionProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	timeout?: number
	value?: string
	isCurrent?: boolean
	handleChange?: (option?: ISelectOption) => void
}

interface IStyleProps {
	color: IColors
	timeout: number
	isCurrent: boolean
}

const useStyles = makeStyles({
	root: ({ color, isCurrent, timeout }: IStyleProps) => ({
		display: 'flex',
		alignItems: 'center',
		width: 'inherit',
		height: 32,
		background: 'tranparent',
		transition: `background ${timeout}ms`,

		'&:hover': {
			background: 'rgba(160, 160, 160, .1)'
		},

		...(isCurrent
			? {
					color: color.main,
					background: color.ripple,

					'&:hover': {
						background: color.ripple
					}
			  }
			: {})
	}),
	text: {
		marginLeft: 12,
		marginRight: 12,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	}
})

const Option: React.FC<IOptionProps> = props => {
	const {
		className,
		children,
		value = '',
		handleChange = () => {},
		color = ThemeNames.PRIMARY,
		timeout = 200,
		isCurrent = false,
		...restProps
	} = props

	const styleProps: IStyleProps = {
		color: selectColor(color),
		timeout,
		isCurrent
	}
	const classes = useStyles(styleProps)

	const handleSelect = React.useCallback(() => {
		const nextOption: ISelectOption = {
			desc: children as string,
			value
		}
		handleChange(nextOption)
	}, [value, handleChange])

	const optionCls = clsx(classes.root, className)

	return (
		<div {...restProps} className={optionCls} onClick={handleSelect}>
			<span className={classes.text}>{children}</span>
		</div>
	)
}

export default React.memo(Option)
