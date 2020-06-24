import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import TodoList from './components/TodoList'
import Button from 'components/Button'
import List from 'components/List'
import Input from 'components/Input'
import { UserOutlined } from '@ant-design/icons'

interface IAppProps {}

const useStyles = makeStyles(
	createStyles({
		app: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100vw',
			height: '100vh'
		},
	})
)

const App: React.FC<IAppProps> = () => {
	const classes = useStyles()
	const handleConsole = () => {
		console.log('Hello')
	}
	const handleEnter = () => {
		console.log('World')
	}
	return (
		<div className={classes.app}>
			<TodoList />
			{/* <Button color="primary" onClick={handleConsole} onMouseEnter={handleEnter}>
				测试按钮
			</Button>
			<Button.Icon><UserOutlined /></Button.Icon>
			<List bordered>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
			</List> */}

			{/* <Input placeholder="Basic" type="search" /> */}
		</div>
	)
}

export default App
