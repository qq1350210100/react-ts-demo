import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

interface ICollpaseProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	visible?: boolean
}

interface IStyleProps {
	containerHeight: string | number
}

const useStyles = makeStyles({
	root: {
		height: ({ containerHeight }: IStyleProps) => containerHeight,
		minHeight: 0,
		transition: 'height 250ms ease-out',
		overflow: 'hidden'
	},
	wrapper: {
		paddingTop: 8,
		paddingBottom: 8
	}
})

const Collapse: React.FC<ICollpaseProps> = props => {
	const { children, className, visible = false, ...restProps } = props

	const containerRef = React.useRef<any>()
	const [initialHeight, setinitialHeight] = React.useState<number>(0)

	const containerHeight = React.useMemo(() => (visible ? initialHeight : 0), [
		visible,
		initialHeight
	])

	React.useEffect(() => {
		const element = containerRef.current
		const firstChild = element?.children?.[0]

		if (firstChild) {
			// 获取collapse子元素高度
			const childHeight: number = firstChild.offsetHeight
			setinitialHeight(childHeight)
		}
	}, [])

	const styleProps: IStyleProps = { containerHeight }
	const classes = useStyles(styleProps)

	const containerCls = clsx(classes.root, className)

	return (
		<div {...restProps} ref={containerRef as any} className={containerCls}>
			<div className={classes.wrapper}>{children}</div>
		</div>
	)
}

export default React.memo(Collapse)
