import _List, { IListProps } from './List'
import _ListItem from './ListItem'

interface IListExports extends React.MemoExoticComponent<React.FC<IListProps>> {
	Item: typeof _ListItem
}

const List = _List as IListExports
List.Item = _ListItem

export default List
