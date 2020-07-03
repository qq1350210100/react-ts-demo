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
	childCount: number
}

const useStyles = makeStyles(
	createStyles({
		root: ({ timeout, childCount }: IStyleProps) => ({
			zIndex: 999,
			minWidth: '100%',
			maxHeight: 160,
			position: 'absolute',
			top: 36,
			left: 0,
			right: 0,
			paddingTop: 4,
			paddingBottom: 4,
			borderRadius: 4,
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			transformOrigin: 'center 0',
			cursor: 'pointer',
			// 为何不直接 auto？因为 hidden 时右边距多了1px的 bug
			overflowY: childCount > 5 ? 'auto' : 'unset',
			animationDuration: `${timeout}ms`
		}),
		enter: {
			animation: '$kf_enter ease-out'
		},
		leave: {
			animation: '$kf_leave ease-out'
		},
		'@keyframes kf_enter': {
			'0%': {
				opacity: 0,
				transform: 'scaleY(.9)'
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
				transform: 'scaleY(.9)'
			}
		}
	})
)

const DropList: React.FC<IDropListProps> = props => {
	const {
		children,
		timeout = 150,
		in: inProp = false,
		onExited = () => {},
		selected,
		handleChange
	} = props

	useTransition({ in: inProp, onExited, timeout })

	const childCount = React.Children.count(children)

	const styleProps: IStyleProps = { timeout, childCount }
	const classes = useStyles(styleProps)

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
