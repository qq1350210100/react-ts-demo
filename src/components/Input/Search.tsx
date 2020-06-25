import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import Input, { IInputProps } from './Input'

const _Search: React.ForwardRefRenderFunction<unknown, IInputProps> = (props, ref) => {
	const { enterButton = <SearchOutlined /> } = props
	return <Input {...props} ref={ref as any} type="search" enterButton={enterButton} />
}

const Search = React.forwardRef<unknown, IInputProps>(_Search)

export default React.memo(Search)
