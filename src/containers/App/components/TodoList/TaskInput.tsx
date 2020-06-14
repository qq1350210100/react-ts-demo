import React from 'react'
import styles from './styles/task-input.module.scss'
import { Input } from 'antd'
const { Search } = Input

interface ITaskInputProps {
	inputVal: string
	handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleAddTask: () => void
}

const TaskInput: React.FC<ITaskInputProps> = props => {
	const { inputVal, handleInput, handleAddTask } = props
	return (
		<div className={styles.root}>
			<Search
				enterButton="Add Task"
				value={inputVal}
				onChange={handleInput}
				onSearch={handleAddTask}
			/>
		</div>
	)
}

export default React.memo(TaskInput)
