interface OriginObject {
	[key: string]: any
}

function omit(origin: OriginObject, ...targets: string[]) {
	for (const target of targets) {
		delete origin[target]
	}
	return origin
}

export default omit
