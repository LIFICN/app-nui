<template>
	<scroll-view scroll-with-animation scroll-x :show-scrollbar="false" class="v-tab"
		:style="{'background-color':bgColor,'width':width}" :id="`tab${refKey}`" :scroll-into-view="scrollInto">
		<view class="tab-content">
			<view class="v-tab-item" v-for="(item,index) in tabList" :key="`${refKey}tabitem${index}`"
				@click="tabSelected(index)" :id="`${refKey}tabitem${index}`" :ref="`${refKey}tabitem${index}`"
				:style="itemStyle">
				<text class="v-tab-text"
					:style="(current==index?activeStyle:defaultStyle)">{{item['name']||item}}</text>
				<view v-if="showBar&&current==index" class="v-tab-bar" :style="barStyle"></view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom') || {}
	// #endif

	export default {
		props: {
			tabList: {
				type: Array, // tab数组
				default () {
					return []
				}
			},
			current: {
				type: Number, // 当前活动tab的下标
				default: 0
			},
			showBar: {
				type: Boolean,
				default: true
			},
			bgColor: {
				type: String,
				default: '#FFFFFF'
			},
			width: {
				type: String,
				default: '750rpx'
			},
			activeStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			defaultStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			barStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			itemStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			refKey: {
				type: String, // 元素专属key值，唯一性，非常重要
				default: 'v-tab'
			}
		},
		data() {
			return {
				tabbarWidth: 0,
				scrollInto: '',
				tabListSize: []
			}
		},
		watch: {
			current: {
				handler(newVal, oldVal) {
					// #ifndef APP-NVUE
					const index = newVal > oldVal ? oldVal : newVal - 1 //让滑块保持在中间
					this.scrollInto = `${this.refKey}tabitem${index}`
					// #endif

					// #ifdef APP-NVUE
					const el = this.$refs[`${this.refKey}tabitem${newVal}`][0]
					let offset = 0

					const space = this.tabListSize.filter((_, index) => {
						if (newVal > oldVal) return index < newVal
						return index >= newVal
					}).reduce((prev, next) => prev + next)

					//修复ios滚动错位的问题
					if (newVal > 0) {
						offset = this.tabBarWidthHalf - this.tabListSize[newVal] / 2
						if (space < this.tabBarWidthHalf || this.sumWidth - space < this.tabBarWidthHalf)
							offset = this.tabListSize[0]
					}

					dom.scrollToElement(el, {
						offset: -offset
					})
					// #endif
				}
			},
			tabList: {
				deep: true,
				immediate: true,
				handler() {
					//解决nvue界面层级太多，数据传递慢，无法及时获取子元素的布局信息bug，此乃天坑
					// #ifdef APP-NVUE
					this.$nextTick(() => {
						const promiseArr = []
						this.tabList.forEach((el, index) => {
							promiseArr.push(this.getElSize(`#${this.refKey}tabitem${index}`))
						})

						Promise.all(promiseArr).then(res => {
							this.tabListSize = res.map(el => el['width'])
						}).catch(err => console.log(err))

						this.getElSize(`#tab${this.refKey}`).then(res => {
							this.tabbarWidth = res['width']
						}).catch(err => console.log(err))
					})
					// #endif
				}
			}
		},
		computed: {
			sumWidth() {
				return this.tabListSize.reduce((prev, next) => prev + next)
			},
			tabBarWidthHalf() {
				return this.tabbarWidth / 2
			}
		},
		methods: {
			tabSelected(index) {
				this.$emit('change', index)
			},
			getElSize(el) {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this)
					query.select(el).boundingClientRect(data => {
						if (typeof data == 'object' && Object.keys(data).length > 0) resolve(data)
						reject(data)
					}).exec()
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.v-tab {
		flex-direction: row;

		.tab-content {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
		}

		&-item {
			padding: 16rpx 20rpx 0rpx 20rpx;
		}

		&-text {
			font-size: 32rpx;
			color: #12141D;
		}

		&-bar {
			border-radius: 6rpx;
			height: 6rpx;
			background-color: #007AFF;
			margin-top: 8rpx;
		}
	}
</style>
