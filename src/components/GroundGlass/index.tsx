import { styled } from '@material-ui/styles'

const GroundGlass = styled('section')({
	display: 'inline-block',
	whiteSpace: 'nowrap',
	borderRadius: 2,
	background: 'rgba(255,255,255,.7)',
	backdropFilter: 'blur(24px)',
	boxShadow: '0 1px 3px rgba(26,26,26,.1)'
})

export default GroundGlass
