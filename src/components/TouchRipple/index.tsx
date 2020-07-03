import _TouchRipple, { ITouchRippleProps } from './TouchRipple'
import { useRipple } from './hooks'

interface ITouchRippleExports
	extends React.MemoExoticComponent<
		React.ForwardRefExoticComponent<ITouchRippleProps & React.RefAttributes<HTMLElement>>
	> {
	useRipple: typeof useRipple
}

const TouchRipple = _TouchRipple as ITouchRippleExports
TouchRipple.useRipple = useRipple

TouchRipple.displayName = 'TouchRipple'

export default TouchRipple
