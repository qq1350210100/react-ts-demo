import React from 'react'
import styles from './styles/index.module.scss'
import TaskList from './TaskList'
import TaskInput from './TaskInput'

interface ITodoListProps {}

interface ListItem {
	id: number
	value: string
}

// 独立于组件的计数
function useCount(defaultCount: number) {
	const count = React.useRef(defaultCount)
	const increase = (value: number = 1) => {
		count.current += value
	}
	const decrease = (value: number = 1) => {
		count.current -= value
	}
	return { count: count.current, increase, decrease }
}

const TodoList: React.FC<ITodoListProps> = () => {
	const [inputVal, setInputVal] = React.useState<string>('')
	const [list, setList] = React.useState<ListItem[]>([])
	const { count, increase } = useCount(0)

	React.useEffect(() => {
		const nextList = [
			{
				id: 0,
				value: 'Get up'
			},
			{
				id: 1,
				value: 'Eat'
			},
			{
				id: 2,
				value: 'Sport'
			}
		]
		increase(nextList.length)
		setList(nextList)
	}, [])

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputVal(value)
	}

	const handleAddTask = React.useCallback(() => {
		if (!inputVal.trim()) {
			return
		}
		setInputVal('')
		setList(prev => [
			...prev,
			{
				id: count,
				value: inputVal
			}
		])
		increase(1)
	}, [inputVal])

	const handleRemoveTask = React.useCallback((id: number) => {
		setList(prev => {
			const nextList = prev.filter(item => item.id !== id)
			return nextList
		})
	}, [])

	return (
		<div className={styles.root}>
			<TaskInput inputVal={inputVal} handleInput={handleInput} handleAddTask={handleAddTask} />
			<TaskList list={list} handleRemoveTask={handleRemoveTask} />
		</div>
	)
}

export default TodoList
