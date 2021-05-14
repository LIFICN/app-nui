<template>
	<view class="main">
		<view :style="{height:statusBarHeight+'px'}"></view>
		<!-- <view class="flex-row content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}"> -->
		<view class="flex-row content" :style="{height:navBarHeight+'px',width:'100%'}">
			<uni-icons type="arrowleft" size="22" @click="back" class="back"></uni-icons>
			<view class="box">
				<slot></slot>
			</view>
		</view>

		<!-- 需要添加占位符高度  状态栏高度+导航栏高度（否则下面tab会塌陷）-->
		<!-- <view :style="{height: statusBarHeight+navBarHeight+'px'}"></view> -->
	</view>
</template>

<script>
	export default {
		props: {},
		data() {
			return {
				statusBarHeight: 20, // 状态栏高度 
				navBarHeight: 45, //导航栏高度,
				windowWidth: 375, //窗口宽度
				content: ''
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// 除了h5 app mp-alipay的情况下执行
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
	}

	.content {
		position: relative;
		align-items: center;
	}

	.back {
		margin-left: 18rpx;
		position: absolute;
		left: 0rpx;
		top: 22rpx;
	}

	.box {
		width: 100%;
		height: 100%;
	}
</style>
