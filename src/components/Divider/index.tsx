import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/styles'

interface IStyleProps {
	dashed: boolean
	titleCentered: boolean
}

interface IDividerProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	title?: string
	titleCentered?: boolean
	dashed?: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			border: 0,
			borderTopWidth: 1,
			borderTopStyle: ({ dashed }: IStyleProps) => (dashed ? 'dashed' : 'solid'),
			borderTopColor: '#f1f1f1',
			margin: '8px 0',
			padding: 0,
			position: 'relative'
		},
		title: ({ titleCentered }: IStyleProps) => ({
			background: '#fff',
			padding: '0 8px',
			position: 'absolute',
			[titleCentered ? 'none' : 'left']: 16
		})
	})
)

const Divider: React.FC<IDividerProps> = props => {
	const { children, className, dashed = false, titleCentered = true } = props
	const classes = useStyles({ dashed, titleCentered })
	const dividerCls = clsx(classes.root, className)

	return (
		<div className={dividerCls}>
			<span className={classes.title}>{children}</span>
		</div>
	)
}

Divider.displayName = 'Divider'

export default React.memo(Divider)
