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
import NavMenu from 'components/NavMenu'

interface IAppProps {}

const useStyles = makeStyles(
	createStyles({
		app: {
			display: 'flex',
			// justifyContent: 'center',
			// alignItems: 'center',
			width: '100vw',
			height: '100vh'
		},
		menu: {
			width: 240
		}
	})
)

const navMap = [
	{
		id: 0,
		name: '主页',
		path: '/',
		icon: null,
		// component: <HomePage />,
		child: null
	},
	{
		id: 1,
		name: '文章分类',
		path: '/article',
		icon: null,
		// component: null,
		child: [
			{
				id: 0,
				name: '全部',
				path: '/all',
				icon: null
				// component: <ArticleListPage />
			},
			{
				id: 1,
				name: '前端',
				path: '/frontend',
				icon: null
				// component: <ArticleListPage sort="frontend" />
			},
			{
				id: 2,
				name: '移动端',
				path: '/mobile',
				icon: null
				// component: <ArticleListPage sort="mobile" />
			},
			{
				id: 3,
				name: '后端',
				path: '/backend',
				icon: null
				// component: <ArticleListPage sort="backend" />
			},
			{
				id: 4,
				name: '计算机通用',
				path: '/computer_science',
				icon: null
				// component: <ArticleListPage sort="computer_science" />
			},
			{
				id: 5,
				name: '工程化',
				path: '/engineering',
				icon: null
				// component: <ArticleListPage sort="engineering" />
			}
		]
	},
	{
		id: 2,
		name: '文档聚合',
		path: '/document',
		icon: null,
		// component: <ArticlePage />,
		child: null
	},
	{
		id: 3,
		name: '设置',
		path: '/setting',
		icon: null,
		// component: <SettingPage />,
		child: null
	}
]

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
			<div className={classes.menu}>
				<NavMenu menuOptions={navMap} color="error" />
			</div>
		</div>
	)
}

export default App
