import React from 'react'
import _Button, { IButtonProps } from './Button'
import _IconButton from './IconButton'

interface IButtonExports
	extends React.MemoExoticComponent<
		React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<HTMLElement>>
	> {
	Icon: typeof _IconButton
}

const Button = _Button as IButtonExports
Button.Icon = _IconButton

export default Button
