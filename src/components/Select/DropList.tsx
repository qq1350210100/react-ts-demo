import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import GroundGlass from '../GroundGlass'
import { ISelectOption } from './Select'
import { useTransition, ITransitionOpts } from 'common/hooks'

export interface IDropListProps extends ITransitionOpts {
	children: React.ReactNode
	selected?: ISelectOption
	handleChange: (option: ISelectOption) => void
}

interface IStyleProps {
	timeout: number
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: '100%',
			maxHeight: 160,
			position: 'absolute',
			top: 36,
			left: 0,
			padding: '4px 0',
			borderRadius: 4,
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			transformOrigin: 'center 0',
			cursor: 'pointer',
			overflowX: 'hidden',
			overflowY: 'auto'
		},
		enter: {
			animation: '$kf_enter ease-out',
			animationDuration: ({ timeout }: IStyleProps) => `${timeout}ms`
		},
		leave: {
			animation: '$kf_leave ease-out',
			animationDuration: ({ timeout }: IStyleProps) => `${timeout}ms`
		},
		'@keyframes kf_enter': {
			'0%': {
				opacity: 0,
				transform: 'scaleY(0)'
			},
			'100%': {
				opacity: 1,
				transform: 'scaleY(1)'
			}
		},
		'@keyframes kf_leave': {
			'0%': {
				opacity: 1,
				transform: 'scaleY(1)'
			},
			'100%': {
				opacity: 0,
				transform: 'scaleY(0)'
			}
		}
	})
)

const DropList: React.FC<IDropListProps> = props => {
	const { children, timeout = 100, in: inProp, onExited = () => {}, selected, handleChange } = props

	useTransition({ in: inProp, onExited, timeout })

	const classes = useStyles({ timeout })

	const dropListCls = clsx(classes.root, inProp ? classes.enter : classes.leave)

	return (
		<GroundGlass className={dropListCls}>
			{React.Children.map(children as any, (child: JSX.Element) => {
				const isCurrent = child.props.value === selected?.value
				return React.cloneElement(child, { handleChange, isCurrent })
			})}
		</GroundGlass>
	)
}

export default React.memo(DropList)
