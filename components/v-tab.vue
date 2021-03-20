<template>
	<view class="v-tab" ref="vTab">
		<scroll-view scroll-with-animation scroll-x :scroll-left="scrollLeft"
			:style="{backgroundColor:bgColor,borderBottom:[isShowBorder?'0.5px solid #ddd':'none']}">
			<view class="flex-row container">

				<view class="flex-1 v-tab-item" v-for="(item,index) in tabList" :key="index" :id="index"
					@tap="tabSelect(index)">
					<text class="text-nowrap"
						:style="{color:(index===current?fontSelectedColor:fontColor),fontSize:fontSize+'rpx',lineHeight: height+'rpx'}">{{item.name}}</text>
					<view :style="{height:barHeight+'rpx',backgroundColor:[current===index?barBgColor:'']}"></view>
				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				convertWidth: 0 //tabItem平均宽度
			};
		},
		props: {
			tabList: {
				type: Array, // tab数组
				default () {
					return [];
				}
			},
			current: {
				type: [Number, String], // 当前活动tab的下标
				default () {
					return 0;
				}
			},
			height: {
				type: Number, // 高度
				default: 88
			},
			barHeight: {
				type: Number, // 底栏高度
				default: 6
			},
			barBgColor: {
				type: String, //底栏颜色
				default: "#0081ff"
			},
			fontColor: {
				type: String, //字体颜色
				default: "black"
			},
			fontSelectedColor: {
				type: String, //选中字体颜色
				default: "#0081ff"
			},
			fontSize: {
				type: Number, // 字号
				default: 30
			},
			bgColor: {
				type: String, //背景色
				default: '#ffffff'
			},
			isShowBorder: {
				type: Boolean, //是否显示底部边框
				default: true
			}
		},
		methods: {
			tabSelect(index) {
				this.$emit('change', index);
			}
		},
		computed: {
			scrollLeft() {
				let convertWidth = this.convertWidth
				if (convertWidth > 0) return (this.current - 1) * convertWidth
				return (this.current - 1) * 65;
			}
		},
		mounted() {
			this.$nextTick(function() {
				const query = uni.createSelectorQuery();
				query.select('.v-tab-item').boundingClientRect(data => {
					if (data != null) this.convertWidth = data.width //获取每个tabItem平均宽度
				}).exec();
			})
		}
	};
</script>

<style lang="scss" scoped>
	.v-tab {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;

		// 隐藏滚动条,适配全平台
		::-webkit-scrollbar {
			display: none;
		}

		.v-tab-item {
			margin: 0 10upx;
			padding: 0 20upx;
		}

		.container {
			text-align: center;
		}

		.text-nowrap {
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>
