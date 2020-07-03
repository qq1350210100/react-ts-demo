import { styled } from '@material-ui/styles'

const baseStyles: any = {
	boxSizing: 'border-box',
	width: '100%',
	height: '100%',
	color: '#303133',
	background: '#fdfdfd',
	paddingLeft: 8,
	paddingRight: 8,
	borderRadius: 4,
	outline: 0,
	border: `1px solid #d9d9d9`,
	transition: 'box-shadow 250ms ease-out, border 250ms ease-out',
	'&::placeholder': {
		color: '#aaa'
	}
}

export const InputBase = styled('input')(baseStyles)

export const TextAreaBase = styled('textarea')(baseStyles)
