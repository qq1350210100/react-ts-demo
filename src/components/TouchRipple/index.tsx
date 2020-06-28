import _TouchRipple, { ITouchRippleProps } from './TouchRipple'
import { useRipple } from './hooks'

interface ITouchRippleExport
	extends React.ForwardRefExoticComponent<ITouchRippleProps & React.RefAttributes<HTMLElement>> {
	useRipple: typeof useRipple
}

const TouchRipple = _TouchRipple as ITouchRippleExport
TouchRipple.useRipple = useRipple

export default TouchRipple
