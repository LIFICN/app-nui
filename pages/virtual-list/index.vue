<template>
	<view class="virtual-list-wrapper" :style="{'height':listHeight+'px'}">
		<view class="previous-space" :style="{'height': previousSpace+'px'}"></view>
		<view class="list-content" :style="{'transform':`translate3d(0, ${previousSpace}px, 0)`}">
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
				sizeArr: []
			}
		},
		computed: {
			//可显示的列表项数
			visibleCount() {
				return Math.ceil(uni.getSystemInfoSync().screenHeight / this.minHeight)
			},
			//数据的起始索引
			startIndex() {
				if (this.scrollTop == 0) return 0
				const index = this.sizeArr.findIndex(el => (el ? el.top : 0) >= this.scrollTop)
				return Math.max(index - 1, 0) //减一是为了缓冲
			},
			//最低子元素高度
			minHeight() {
				return uni.upx2px(80) //转成px
			},
			//数据的结束索引
			endIndex() {
				return Math.min(this.startIndex + this.visibleCount, this.list.length - 1)
			},
			//列表显示数据
			visibleData() {
				if (this.isTouchUp) return this.list.slice(this.touchUpIndex, this.endIndex)
				return this.list.slice(this.startIndex, this.endIndex + this.bufferSize)
			},
			//satrtindex到顶部间距
			previousSpace() {
				try {
					if (this.isTouchUp) return this.sizeArr[this.touchUpIndex]['top']
					return this.sizeArr[this.startIndex]['top']
				} catch {
					return 0
				}
			},
			//缓冲区数量
			bufferSize() {
				return 20
			},
			//向上滑动起始位置控制
			touchUpIndex() {
				return Math.max(this.startIndex - this.bufferSize, 0)
			},
			//预估列表高度
			estimateHeight() {
				return this.minHeight * this.list.length
			},
			//item上下间距
			space() {
				return uni.upx2px(20)
			}
		},
		watch: {
			list: {
				deep: true,
				immediate: true,
				handler(newVal, _) {
					this.sizeArr = new Array(newVal.length)
				}
			}
		},
		created() {
			for (let i = 1; i <= 1000; i++) {
				this.list.push(i)
			}

			this.listHeight = this.estimateHeight
		},
		updated() {
			if (this.sizeArr[this.sizeArr.length - 1]) return
			uni.createSelectorQuery().in(this).selectAll('.item')
				.boundingClientRect().exec(res => {
					let j = 0;
					for (let i = this.startIndex; i <= this.endIndex; i++) {
						this.sizeArr[i] = { height: res[0][j].height + this.space }
						this.sizeArr[i]['top'] = this.sumSize(0, i)
						j++
					}

					const sumHeight = this.sumSize(0, this.sizeArr.length)
					if (this.estimateHeight >= sumHeight) return //预估高度大于等于当前缓存元素高度，不更新
					this.listHeight = sumHeight
				})
		},
		onPageScroll: throttle(function(e) {
			if (e.scrollTop < this.scrollTop) this.isTouchUp = true //判断滑动方向
			else this.isTouchUp = false
			this.scrollTop = e.scrollTop
		}, 12),
		methods: {
			sumSize(start, end) {
				let sum = 0
				for (let i = start; i < end; i++) {
					sum += (this.sizeArr[i] ? this.sizeArr[i].height : 0)
				}
				return sum
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
