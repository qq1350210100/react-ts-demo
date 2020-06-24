export enum ThemeNames {
	DEFAULT = 'default',
	PRIMARY = 'primary',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error'
}

export interface IColors {
	readonly name: string
	readonly main: string
	readonly bright: string
	readonly dim: string
	readonly text: string
	readonly ripple: string
}

export interface IThemes {
	readonly [key: string]: IColors
}

const themeColors: IThemes = {
	default: {
		name: 'default',
		main: '#f4f4f5',
		bright: '#fcfcfe',
		dim: '#e8e8e8',
		text: '#303133',
		ripple: '#606266'
	},
	primary: {
		name: 'primary',
		main: '#409eff',
		bright: '#66b1ff',
		dim: '#3a8ee6',
		text: '#ffffff',
		ripple: '#ecf5ff'
	},
	success: {
		name: 'success',
		main: '#67c23a',
		bright: '#85ce61',
		dim: '#5daf34',
		text: '#ffffff',
		ripple: '#f0f9eb'
	},
	warning: {
		name: 'warning',
		main: '#e6a23c',
		bright: '#ebb563',
		dim: '#cf9236',
		text: '#ffffff',
		ripple: '#fdf6ec'
	},
	error: {
		name: 'error',
		main: '#f56c6c',
		bright: '#f78989',
		dim: '#dd6161',
		text: '#ffffff',
		ripple: '#fef0f0'
	},
	transparent: {
		name: 'transparent',
		main: 'rgba(120,120,120,.2)',
		bright: 'rgba(240,240,240,.2)',
		dim: 'rgba(120,120,120,.1)',
		text: '#303133',
		ripple: 'rgba(0,0,0,.4)'
	}
}

export function selectColor(name: string): IColors {
	return themeColors[name]
}
