import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import _ from 'lodash'
import Window from './Window'

export interface IPopupProps extends React.RefAttributes<HTMLElement> {
	visible?: boolean
}

const _Popup: React.ForwardRefRenderFunction<unknown, IPopupProps> = (props, ref) => {
	const { visible = false } = props
	const windowProps = _.omit(props, ['visible'])

	return (
		<TransitionGroup component={null}>
			{visible ? <Window ref={ref} {...windowProps} /> : null}
		</TransitionGroup>
	)
}

const Popup = React.forwardRef<unknown, IPopupProps>(_Popup)

export default React.memo(Popup)
