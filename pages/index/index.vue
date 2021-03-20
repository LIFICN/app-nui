<template>
	<view class="flex-column flex-1 index-container">
		<v-tab :current="current" :tabList="tabList" @change="change('tab',$event)" />

		<swiper class="flex-1 swiper" :current="current" :circular="false" @change="change('swiper',$event)"
			:duration="300">
			<swiper-item v-for="(item,index) in tabList" :key="index" class="flex-column swiper-item">
				<view class="btn-c" v-if="index==0">
					<button @click="goToPage('../search/index')">搜索页</button>
					<button @click="goToPage('../login/index')">登录demo页</button>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="getUserInfo" @getuserinfo="getuserinfo">获取微信小程序用户信息</button>
					<!-- #endif -->
					<button @click="addCount()">全局状态管理 {{count}}</button>
				</view>

				<view v-else style="text-align: center;">{{index}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import vTab from '@/components/v-tab'

	export default {
		components: {
			vTab,
		},
		computed: {
			count() {
				return this.$store.state.count
			}
		},
		data() {
			return {
				current: 0,
				tabList: [],
			}
		},
		created() {
			for (var i = 0; i < 7; i++) {
				this.tabList.push({
					name: `tabItem${i}`
				})
			}
		},
		methods: {
			change(type, e) {
				if (type == 'swiper' && !e.detail['source']) return
				this.current = type == 'tab' ? e : e.detail['current']
			},
			goToPage(url) {
				this.$toolkit.toPage.navigateTo(url)
			},
			getuserinfo(res) {
				this.$toolkit.tips.showModal('test', JSON.stringify(res))
			},
			onReachBottom() {
				console.log('bottom')
			},
			onPullDownRefresh() {
				console.log('refresh')
				setTimeout(() => uni.stopPullDownRefresh(), 600)
			},
			addCount() {
				this.$store.dispatch('addCount')
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
	}

	.index-container {
		.swiper-item {
			justify-content: center;

			.btn-c {
				width: 100%;

				:nth-child(n) {
					width: 80%;
					margin-top: 30rpx;
				}
			}
		}
	}
</style>
