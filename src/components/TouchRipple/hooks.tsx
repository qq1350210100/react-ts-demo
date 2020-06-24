import React from 'react'

export interface IUseRipple {
	(muted?: boolean): IUseRippleReturn
}

export interface IUseRippleReturn {
	rippleRef: React.RefObject<any>
	handleStart: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void | null
	handleStop: () => void | null
}

/**
 * 绑定水波纹特效
 * @param {boolean} muted 是否禁用
 */
export const useRipple: IUseRipple = (muted = false) => {
	const rippleRef: React.MutableRefObject<any> = React.useRef()

	const handleStart = React.useCallback(e => (muted ? null : rippleRef.current.start(e)), [muted])

	const handleStop = React.useCallback(() => (muted ? null : rippleRef.current.stop()), [muted])

	return { rippleRef, handleStart, handleStop }
}
