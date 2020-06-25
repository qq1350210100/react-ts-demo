import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import TodoList from './components/TodoList'
import Button from 'components/Button'
import List from 'components/List'
import Input from 'components/Input'
import Divider from 'components/Divider'
import { UserOutlined } from '@ant-design/icons'
import Loading from 'components/Loading'
import Tag from 'components/Tag'
import Switch from 'components/Switch'
import { encode } from 'querystring'

interface IAppProps {}

const useStyles = makeStyles(
	createStyles({
		app: {
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
	const hanldeSearch = value => {
		console.log('value', value)
	}
	return (
		<div className={classes.app}>
			{/* <TodoList /> */}
			{/* <Button color="primary" onClick={handleConsole} onMouseEnter={handleEnter}>
				测试按钮
			</Button>
			<Button.Icon>
				<UserOutlined />
			</Button.Icon>
			<List bordered>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
			</List>
			<Input placeholder="Basic" /> */}
			{/* <Input.Search placeholder="Search..." onSearch={hanldeSearch} />
			<Input.TextArea placeholder="Search..." onPressEnter={hanldeSearch} /> */}

			{/* <Input.Group>
				<Input.Search />
				<Input />
				<Input.TextArea />
			</Input.Group> */}

			{/* <Divider /> */}
			{/* <Divider>分割线</Divider> */}

			{/* <Loading.Line />
			<Loading.Bounce color="error" /> */}

			{/* <Tag>时代发生地方</Tag> */}
			<Switch
				onChange={checked => {
					console.log('11', checked)
				}}
			/>
		</div>
	)
}

export default App
