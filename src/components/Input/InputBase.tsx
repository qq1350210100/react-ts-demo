import { styled, createStyles } from '@material-ui/styles'

const InputBase = styled('input')({
	boxSizing: 'border-box',
	width: '100%',
	height: '100%',
	color: '#303133',
	background: '#fcfcfc',
	paddingLeft: 8,
	paddingRight: 8,
	borderRadius: 4,
	outline: 0,
	border: `1px solid #e5e5e5`,
	transition: 'all 250ms ease-out',
	'&::placeholder': {
		color: '#aaa'
	}
})

export default InputBase
