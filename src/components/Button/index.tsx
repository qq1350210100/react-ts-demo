import React from 'react'
import _Button, { IButtonProps } from './Button'
import _IconButton from './IconButton'

interface ITouchRippleExport
	extends React.MemoExoticComponent<React.FC<IButtonProps & React.RefAttributes<HTMLElement>>> {
	Icon: typeof _IconButton
}

const Button = _Button as ITouchRippleExport
Button.Icon = _IconButton

export default Button
