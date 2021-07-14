<template>
	<view class="flex-column login-wrapper">
		<view class="flex-column head">
			<image class="head-img" src="@/static/logo.png">
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" type="text" :value="phone" @input="input($event,'phone')"
				placeholder="请输入手机号" />
			<uni-icons v-show="phone" @tap="clearInput('phone')" type="closeempty" size="16"></uni-icons>
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" value="" :value="pwd" @input="input($event,'pwd')" placeholder="请输入密码" />
			<uni-icons v-show="pwd" @tap="clearInput('pwd')" type="closeempty" size="16"></uni-icons>
		</view>

		<view class="flex-row list-item">
			<input class="flex-1 list-input" :value="code" @input="input($event,'code')" placeholder="请输入验证码" />
			<text class="flex-row code" @tap="sendCode" :style="{color: [sendCodeInterval>0?'gray':'#007aff']}">
				{{sendCodeInterval > 0 ? `${sendCodeInterval}s` : '获取验证码'}}
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
			},
			input(e, type) {
				const { value } = e.target
				if (type === 'phone') this.phone = value
				else if (type === 'pwd') this.pwd = value
				else if (type == 'code') this.code = value
			},
			sendCode() {
				const that = this
				if (that.sendCodeInterval !== 0) return
				that.sendCodeInterval++
				let intervalId = setInterval(() => {
					that.sendCodeInterval++
					if (that.sendCodeInterval < 60) return
					that.sendCodeInterval = 0
					clearInterval(intervalId)
				}, 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	button::after {
		border: none;
	}

	.login-wrapper {
		align-items: center;
		overflow: hidden;

		.head {
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			width: 161rpx;
			height: 161rpx;

			.head-img {
				width: 100%;
				height: 100%;
			}
		}

		.list-item {
			border: 1px solid #F1F1F1;
			border-radius: 60rpx;
			padding: 20rpx;
			margin: 40rpx 60rpx 0rpx 60rpx;
			align-items: center;
			width: calc(100% - 120rpx);
			box-sizing: border-box;
		}

		.list-input {
			padding-right: 10rpx;
			color: #333333;
			font-size: 32rpx;
		}

		.btn {
			font-size: 32rpx;
			border-radius: 60rpx;
			background-color: #007aff;
			color: #FFFFFF;
			margin: 40rpx;
			width: calc(100% - 120rpx);
		}

		.btn-hover {
			background-color: #0062cc !important;
		}

		.code {
			align-items: center;
			color: #555555;
			font-size: 28rpx;
		}
	}
</style>
