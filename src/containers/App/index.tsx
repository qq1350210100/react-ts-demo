import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import TodoList from './components/TodoList'
import Button from 'components/Button'

interface IAppProps {}

const useStyles = makeStyles(
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100vw',
			height: '100vh'
		}
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
		<div className={classes.root}>
			{/* <TodoList /> */}
			<Button color="primary" onClick={handleConsole} onMouseEnter={handleEnter}>
				测试按钮
			</Button>
			<Button.Icon>icon</Button.Icon>
		</div>
	)
}

export default App
