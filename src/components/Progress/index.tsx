import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'

interface IStyleProps {
	fixedTop: boolean
	trailColor: string
	percent: number
	color: IColors
}

interface IProgressProps {
	className?: string
	percent?: number
	color?: string
	trailColor?: string
	fixedTop?: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: ({ fixedTop, trailColor }: IStyleProps) => ({
			position: 'relative',
			...(fixedTop
				? {
						zIndex: 99,
						position: 'fixed',
						top: 0,
						left: 0
				  }
				: {}),
			width: '100%',
			height: 2,
			background: trailColor
		}),
		line: ({ percent, color }: IStyleProps) => ({
			width: `${percent}%`,
			height: '100%',
			background: color.main,
			position: 'absolute',
			top: 0,
			left: 0,
			transition: 'all .2s'
		})
	})
)

const Progress: React.FC<IProgressProps> = props => {
	const {
		className,
		percent = 0,
		color = ThemeNames.PRIMARY,
		trailColor = 'rgba(0,0,0,0)',
		fixedTop = false
	} = props

	const stylesProps: IStyleProps = { color: selectColor(color), trailColor, percent, fixedTop }
	const classes = useStyles(stylesProps)

	const progressCls = clsx(classes.root, className)

	return (
		<div className={progressCls}>
			<div className={classes.line}></div>
		</div>
	)
}

export default React.memo(Progress)
