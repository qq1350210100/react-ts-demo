import _Select, { ISelectProps } from './Select'
import _Option from './Option'

interface ISelectExports
	extends React.ForwardRefExoticComponent<ISelectProps & React.RefAttributes<HTMLElement>> {
	Option: typeof _Option
}

const Select = _Select as ISelectExports
Select.Option = _Option

Select.displayName = 'Select'

export default Select
