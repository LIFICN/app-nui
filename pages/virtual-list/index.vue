<template>
	<view class="virtual-list-wrapper" :style="{'height':listHeight+'px'}">
		<view class="previous-space" :style="{'height': previousSpace+'px'}"></view>
		<view class="list-content" id="list-content" :style="{'transform':`translate3d(0, ${previousSpace}px, 0)`}">
			<view class="item" v-for="num in visibleData" :key="num">
				{{num}}
			</view>
		</view>
	</view>
</template>

<script>
	import { throttle } from '@/utils/modules/func.js'

	export default {
		data() {
			return {
				list: [],
				scrollTop: 0,
				isTouchUp: false,
				listHeight: 0,
				isScrollBottom: false
			}
		},
		computed: {
			//可显示的列表项数
			visibleCount() {
				return Math.ceil(uni.getSystemInfoSync().screenHeight / this.itemHeight)
			},
			//数据的起始索引
			startIndex() {
				return Math.floor(this.scrollTop / this.itemHeight)
			},
			//子元素高度
			itemHeight() {
				return uni.upx2px(100) //转成px
			},
			//数据的结束索引
			endIndex() {
				return this.startIndex + this.visibleCount
			},
			//列表显示数据
			visibleData() {
				if (this.isTouchUp) return this.list.slice(this.touchUpIndex, this.endIndex)
				return this.list.slice(this.startIndex, this.endIndex + this.bufferSize)
			},
			//satrtindex到顶部间距
			previousSpace() {
				if (this.isTouchUp) return (this.touchUpIndex * this.itemHeight)
				return this.startIndex * this.itemHeight
			},
			//缓冲区数量
			bufferSize() {
				return 20
			},
			//向上滑动起始位置控制
			touchUpIndex() {
				const start = this.startIndex - this.bufferSize
				return start > 0 ? start : 0
			},
			//预估列表高度
			estimateHeight() {
				return 30 * this.list.length
			},
			//列表最后一个item
			lastItem() {
				return this.list[this.list.length - 1]
			}
		},
		watch: {
			list: {
				deep: true,
				immediate: true,
				handler() {
					this.isScrollBottom = false
				}
			}
		},
		created() {
			for (let i = 1; i <= 1000; i++) {
				this.list.push(i)
			}

			this.listHeight = this.estimateHeight
		},
		async updated() {
			if (this.isScrollBottom) return //滚动到底不再更新
			const { height } = await this.getELSize(`list-content`)
			const sumHeight = this.scrollTop + height
			if (this.estimateHeight >= sumHeight) return
			this.listHeight = this.scrollTop + height
		},
		onPageScroll: throttle(function(e) {
			if (e.scrollTop < this.scrollTop) this.isTouchUp = true //判断滑动方向
			else this.isTouchUp = false

			if (this.visibleData.lastIndexOf(this.lastItem) > -1)
				this.isScrollBottom = true //判断是否滚动到底

			this.scrollTop = e.scrollTop
		}, 100),
		methods: {
			getELSize(id) {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this)
					query.select(`#${id}`).boundingClientRect(data => {
						if (data && typeof data == 'object') resolve(data)
						else reject(data)
					}).exec()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.virtual-list-wrapper {
		position: relative;
		overflow: hidden;

		.previous-space {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.list-content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}

		.item {
			font-size: 28rpx;
			color: #7dbcfc;
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #e8f3fe;
			margin-top: 20rpx;
		}
	}
</style>
