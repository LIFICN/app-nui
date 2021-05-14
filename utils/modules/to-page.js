export default {
	navigateTo(url) {
		uni.navigateTo({
			url: url,
			fail(err) {
				console.log(err)
			}
		})
	},
	redirectTo(url) {
		uni.redirectTo({
			url: url,
			fail(err) {
				console.log(err)
			}
		})
	},
	switchTab(url) {
		uni.switchTab({
			url: url,
			fail(err) {
				console.log(err)
			}
		})
	},
	reLaunch(url) {
		uni.reLaunch({
			url: url,
			fail(err) {
				console.log(err)
			}
		})
	}
}
