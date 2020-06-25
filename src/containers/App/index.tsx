import React, { useState } from 'react'
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
import Popup from 'components/Popup'
import Progress from 'components/Progress'
import Collapse from 'components/Collapse'

interface IAppProps {}

const useStyles = makeStyles(
	createStyles({
		app: {
			display: 'flex',
			// justifyContent: 'center',
			// alignItems: 'center',
			width: '100vw',
			height: '100vh'
		}
	})
)

const App: React.FC<IAppProps> = () => {
	const classes = useStyles()

	// const {
	// 	triggerRef,
	// 	popupRef,
	// 	visible,
	// 	handleShowPopup,
	// 	handleHidePopup
	// } = Popup.usePopupVisible()

	const [visible, setVisible] = useState<boolean>(false)

	const handleConsole = () => {
		console.log('Hello')
	}
	const handleEnter = () => {
		console.log('World')
	}
	const hanldeSearch = value => {
		console.log('value', value)
	}

	// const [precent, setPercent] = React.useState(0)
	// React.useEffect(() => {
	// 	setInterval(() => {
	// 		const percent = Math.random() * 100
	// 		setPercent(percent)
	// 	}, 1000)
	// }, [])

	const handleToggleCollapse = () => {
		setVisible(prev => !prev)
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
			{/* <Switch
				onChange={checked => {
					console.log('11', checked)
				}}
			/> */}

			{/* <Button.Icon onClick={handleShowPopup}>
				<UserOutlined />
			</Button.Icon>
			<Popup ref={popupRef} visible={visible}>
				test
				<Button ref={triggerRef} onClick={handleHidePopup}>
					按钮
				</Button>
			</Popup> */}

			{/* <Progress percent={precent} color="error" fixedTop /> */}

			{/* <Button onClick={handleToggleCollapse}>切换</Button>
			<Collapse visible={visible}>
				<List bordered>
					<List.Item>sdfdsff</List.Item>
					<List.Item>sdfdsff</List.Item>
					<List.Item>sdfdsff</List.Item>
					<List.Item>sdfdsff</List.Item>
				</List>
			</Collapse> */}
		</div>
	)
}

export default App
