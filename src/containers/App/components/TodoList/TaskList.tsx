import React from 'react'
import styles from './styles/task-list.module.scss'
import { List } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface IListItem {
	id: number
	value: string
}

interface ITaskListProps {
	list: IListItem[]
	handleRemoveTask: (id: number) => void
}

const TaskList: React.FC<ITaskListProps> = props => {
	const { list = [], handleRemoveTask } = props
	return (
		<List className={styles.root}>
			{list.map(item => (
				<List.Item className={styles.item} key={item.id}>
					<List.Item.Meta title={item.value} />
					<CloseOutlined onClick={() => handleRemoveTask(item.id)} />
				</List.Item>
			))}
		</List>
	)
}

export default React.memo(TaskList)
