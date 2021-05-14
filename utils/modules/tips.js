export default {
	showModal(title, content, showCancel) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: title,
				content: content,
				showCancel: showCancel || true,
				confirmColor: "#007AFF",
				success(flag) {
					if (flag['cancel']) reject()
					if (flag['confirm']) resolve()
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},
	showToast(title, position) {
		return new Promise((resolve, reject) => {
			uni.showToast({
				title: title,
				position: position || "bottom",
				success() {
					resolve()
				},
				fail(err) {
					reject(err)
				}
			});
		})
	}
}
