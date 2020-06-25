import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CloseOutlined } from '@ant-design/icons'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'

interface ITagProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	bordered?: boolean
	closeable?: boolean
	onClose?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

interface IStyleProps {
	color: IColors
	bordered: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: ({ bordered, color }: IStyleProps) => ({
			boxSizing: 'border-box',
			display: 'flex',
			alignItems: 'center',
			height: 20,
			minWidth: 32,
			fontSize: 12,
			color: color.main,
			background: color.ripple,
			padding: '0 4px',
			border: bordered ? `1px solid ${color.bright}` : 0,
			borderRadius: 2,
			cursor: 'default',

			'&>i': {
				display: 'flex',
				alignItems: 'center',
				height: '100%',
				fontSize: 10,
				marginLeft: 4,
				cursor: 'pointer',
				transition: 'color 250ms',

				'&:hover': {
					color: color.dim
				}
			}
		})
	})
)

const Tag: React.FC<ITagProps> = props => {
	const {
		className,
		children,
		color = ThemeNames.PRIMARY,
		bordered = true,
		closeable = false,
		onClose = () => {}
	} = props

	const stylesProps: IStyleProps = {
		bordered,
		color: selectColor(color)
	}
	const classes = useStyles(stylesProps)
	const tagCls = clsx(classes.root, className)

	return (
		<div className={tagCls}>
			{children}
			{closeable && (
				<i onClick={onClose}>
					<CloseOutlined />
				</i>
			)}
		</div>
	)
}

export default React.memo(Tag)
