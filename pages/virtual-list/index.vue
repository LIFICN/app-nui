<template>
	<view class="virtual-list-wrapper">
		<view class="previous-space" :style="{'height':psHeight+'px'}"></view>
		<view class="item" v-for="num in visibleData" :key="num">
			{{num}}
		</view>
		<view class="next-space" :style="{'height': nsHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				scrollTop: 0
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
				return uni.upx2px(70) //转成px
			},
			// 数据的结束索引
			endIndex() {
				return this.startIndex + this.visibleCount
			},
			//列表显示数据
			visibleData() {
				return this.list.slice(this.startIndex, this.endIndex)
			},
			//上占位
			psHeight() {
				return this.startIndex * this.itemHeight
			},
			//下占位
			nsHeight() {
				const param = (this.list.length - 1 - this.endIndex) * this.itemHeight
				return param > 0 ? param : 0
			}
		},
		created() {
			for (let i = 1; i <= 1000; i++) {
				this.list.push(i)
			}
		},
		onPageScroll(e) {
			if (this.endIndex > this.list.length - 1) return
			this.scrollTop = e.scrollTop
		}
	}
</script>

<style lang="scss" scoped>
	.virtual-list-wrapper {
		overflow-x: hidden;
		padding: 0rpx 20rpx 20rpx 20rpx;

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
