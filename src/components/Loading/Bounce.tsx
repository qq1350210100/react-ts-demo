import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, IColors, selectColor } from 'common/themeColors'

interface ILineProps {
	color?: string
}

interface IStyleProps {
	color: IColors
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: 40,
			height: 40,
			position: 'relative'
		},
		ballCommon: {
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			position: 'absolute',
			top: 0,
			left: 0,
			opacity: 0.6,
			// mixBlendMode: 'multiply',
			animation: '$kf_ball_stretch 2s infinite ease-in-out',
			background: ({ color }: IStyleProps) =>
				color.name === ThemeNames.DEFAULT ? '#888' : color.main
		},
		ball1: {},
		ball2: {
			animationDelay: '-1000ms'
		},
		'@keyframes kf_ball_stretch': {
			'0%, 100%': {
				transform: 'scale(0)'
			},
			'50%': {
				transform: 'scale(1)'
			}
		}
	})
)

const Loading: React.FC<ILineProps> = props => {
	const { color = ThemeNames.PRIMARY } = props
	const stylesProps: IStyleProps = { color: selectColor(color) }
	const classes = useStyles(stylesProps)

	return (
		<div className={classes.root}>
			<div className={clsx(classes.ballCommon, classes.ball1)}></div>
			<div className={clsx(classes.ballCommon, classes.ball2)}></div>
		</div>
	)
}

export default React.memo(Loading)
