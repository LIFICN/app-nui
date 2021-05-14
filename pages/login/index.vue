<template>
	<view class="flex-column login-wrapper">

		<view class="flex-column head">
			<image class="head-img" src="@/static/logo.png">
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" type="text" :value="phone" @input="input($event,'phone')"
				placeholder="请输入手机号" />
			<uni-icons v-show="phone" @click="clearInput('phone')" type="close" size="16"></uni-icons>
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" value="" :value="pwd" @input="input($event,'pwd')" placeholder="请输入密码" />
			<uni-icons v-show="pwd" @click="clearInput('pwd')" type="close" size="16"></uni-icons>
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" :value="code" @input="input($event,'code')" placeholder="请输入短信验证码" />
			<uni-icons v-show="code" @click="clearInput('code')" type="close" size="16" style="margin-right: 3px;">
			</uni-icons>
			<text class="flex-row code" @click="sendCode" :style="{color: [sendCodeInterval>0?'gray':'#007aff']}">
				{{sendCodeInterval>0 ?`${sendCodeInterval}s`:'获取验证码'}}
			</text>
		</view>

		<button hover-class="btn-hover" class="btn">立即登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				phone: '',
				pwd: '',
				code: '',
				sendCodeInterval: 0
			}
		},
		methods: {
			clearInput(type) {
				if (type === 'phone') this.phone = ''
				else if (type === 'pwd') this.pwd = ''
				else if (type == 'code') this.code = ''
			},
			input(e, type) {
				const v = e.target.value
				if (type === 'phone') this.phone = v
				else if (type === 'pwd') this.pwd = v
				else if (type == 'code') this.code = v
			},
			sendCode() {
				var that = this
				if (that.sendCodeInterval === 0) {
					var intervalId = setInterval(() => {
						that.sendCodeInterval++
						if (that.sendCodeInterval >= 60) {
							that.sendCodeInterval = 0
							clearInterval(intervalId)
							console.log('定时器已清除')
						}
					}, 1000);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	button::after {
		border: none;
	}

	.btn-hover {
		background-color: #0062cc !important;
	}

	.login-wrapper {
		align-items: center;
		overflow: hidden;

		.head {
			justify-content: center;
			align-items: center;
			margin-top: 30rpx;
			width: 161rpx;
			height: 161rpx;
		}

		.head-img {
			width: 100%;
			height: 100%;
		}

		.list-item {
			border: 1px solid #F1F1F1;
			border-radius: 50rpx;
			padding: 20rpx;
			width: 80%;
			margin: 20rpx;
			align-items: center;
		}

		.list-input {
			padding-right: 10rpx;
		}

		.btn {
			font-size: 35rpx;
			width: 85%;
			border-radius: 50rpx;
			background-color: #007aff;
			color: white;
			margin: 20rpx;
		}

		.code {
			align-items: center;
			color: #555555;
			font-size: 28rpx;
		}
	}
</style>
