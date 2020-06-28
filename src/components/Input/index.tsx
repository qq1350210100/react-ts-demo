import _Input, { IInputProps } from './Input'
import _Search from './Search'
import _TextArea from './TextArea'
import _Group from './Group'

interface IInputExport
	extends React.MemoExoticComponent<
		React.ForwardRefExoticComponent<IInputProps & React.RefAttributes<HTMLElement>>
	> {
	Search: typeof _Search
	TextArea: typeof _TextArea
	Group: typeof _Group
}

const Input = _Input as IInputExport
Input.Search = _Search
Input.TextArea = _TextArea
Input.Group = _Group

export default Input
