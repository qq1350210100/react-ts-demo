import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'

interface ISwitchProps {
	className?: string
	defaultChecked?: boolean
	color?: string
	bordered?: boolean
	disabled?: boolean
	value?: boolean
	onChange?: (checked?: boolean) => void
}

interface IStyleProps {
	color: IColors
	disabled: boolean
	checked: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: 40,
			height: 20,
			position: 'relative'
		},
		checkbox: {
			display: 'none'
		},
		switch: ({ checked, color, disabled }: IStyleProps) => ({
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			background: checked ? color.main : '#fafafa',
			paddingLeft: 4,
			paddingRight: 4,
			borderRadius: 10,
			border: checked ? 'rgba(0,0,0,0)' : '1px solid #e2e2e2',
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'pointer',
			transition: 'border .2s, background .2s'
		}),
		button: ({ checked }: IStyleProps) => ({
			width: 12,
			height: 12,
			borderRadius: '50%',
			background: checked ? '#fff' : '#303133',
			transform: checked ? 'translateX(19px)' : 'none',
			transition: 'transform .2s, background .2s'
		})
	})
)

const Switch: React.FC<ISwitchProps> = props => {
	const {
		className,
		color = ThemeNames.PRIMARY,
		disabled = false,
		defaultChecked = false,
		value = defaultChecked,
		onChange = () => {},
		...restProps
	} = props

	const [checked, setChecked] = React.useState<boolean>(defaultChecked)

	const stylesProps: IStyleProps = {
		color: selectColor(color),
		checked,
		disabled
	}
	const classes = useStyles(stylesProps)

	const handleToggle = React.useCallback(() => {
		if (!disabled) {
			const nextChecked = !checked
			onChange && onChange(nextChecked)
			setChecked(prev => !prev)
		}
	}, [disabled, checked, onChange])

	const handleSwitchChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const checked = e.target.checked
			onChange && onChange(checked)
		},
		[onChange]
	)

	React.useEffect(() => {
		setChecked(value)
	}, [value])

	const switchCls = clsx(classes.root, className)

	return (
		<div {...restProps} className={switchCls}>
			<div className={classes.switch} onClick={handleToggle}>
				<span className={classes.button}></span>
			</div>
			<input
				className={classes.checkbox}
				type="checkbox"
				checked={checked}
				onChange={handleSwitchChange}
			/>
		</div>
	)
}

export default Switch
