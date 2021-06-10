export function throttle(func, wait) { //节流函数
	let timer = null
	return function() {
		if (timer) return
		timer = setTimeout(() => {
			func.apply(this, arguments)
			timer = null
		}, wait)
	}
}

export function debounce(func, wait) { //防抖函数
	let timer = null
	return function() {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => func.apply(this, arguments), wait)
	}
}
