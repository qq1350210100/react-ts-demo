import React from 'react'
import _Loading, { ILoadingProps } from './Loading'
import _Bounce from './Bounce'
import _Line from './Line'

interface ILoadingExports extends React.MemoExoticComponent<React.FC<ILoadingProps>> {
	Bounce: typeof _Bounce
	Line: typeof _Line
}

const Loading = _Loading as ILoadingExports

Loading.Bounce = _Bounce
Loading.Line = _Line

Loading.displayName = 'Loading'

export default Loading
