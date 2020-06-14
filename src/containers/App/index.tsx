import React from 'react'
import TodoList from './components/TodoList'

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
	return (
		<div>
			<TodoList />
		</div>
	)
}

export default App
