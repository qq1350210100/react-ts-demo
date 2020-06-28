import _Form, { IFormProps } from './Form'
import _FormItem from './FormItem'
import { useForm } from './hooks'

interface IFormExports extends React.MemoExoticComponent<React.FC<IFormProps>> {
	Item: typeof _FormItem
	useForm: typeof useForm
}

const Form = _Form as IFormExports

Form.Item = _FormItem
Form.useForm = useForm

export default Form
