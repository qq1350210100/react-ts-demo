import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'
import ButtonBase from '../Button/ButtonBase'

interface ISwitchProps {
	className?: string
	defaultChecked?: boolean
	color?: string
	bordered?: boolean
	disabled?: boolean
	name?: string
	value?: boolean
	error?: boolean
	onChange?: (checked?: boolean, name?: string) => void
}

interface IStyleProps {
	color: IColors
	disabled: boolean
	checked: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: ({ checked, color, disabled }: IStyleProps) => ({
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: 40,
			height: 20,
			position: 'relative',
			background: checked ? color.main : '#fcfcfc',
			paddingLeft: 4,
			paddingRight: 4,
			borderRadius: 10,
			border: checked ? 'rgba(0,0,0,0)' : '1px solid #e2e2e2',
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'pointer',
			transition: 'border .2s, background .2s',

			'&>div': {
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				height: '100%'
			}
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
		name,
		value = false,
		error = false,
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
			onChange(!checked, name)
			setChecked(prev => {
				return !prev
			})
		}
	}, [disabled, onChange, checked, name])

	React.useEffect(() => {
		setChecked(value)
	}, [value])

	const switchCls = clsx(classes.root, className)

	return (
		<ButtonBase type="button" {...restProps} className={switchCls}>
			<div onClick={handleToggle}>
				<span className={classes.button}></span>
			</div>
		</ButtonBase>
	)
}

export default React.memo(Switch)
