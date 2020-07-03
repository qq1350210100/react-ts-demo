import _Popup, { IPopupProps } from './Popup'
import { usePopupVisible } from './hooks'

interface IPopupExports
	extends React.MemoExoticComponent<
		React.ForwardRefExoticComponent<IPopupProps & React.HTMLAttributes<HTMLElement>>
	> {
	usePopupVisible: typeof usePopupVisible
}

const Popup = _Popup as IPopupExports
Popup.usePopupVisible = usePopupVisible

Popup.displayName = 'Popup'

export default Popup
