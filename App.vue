<script>
	import environment from '@/utils/modules/environment.js'

	export default {
		onLaunch: function() {
			console.log('App Launch')
			console.log(environment.isDevelopment() ? '开发环境' : '正式环境')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 全局滚动条样式 */
	/* @import url("~@/static/scrollbarEx.css"); */
</style>
