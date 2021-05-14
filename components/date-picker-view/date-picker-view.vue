<template>
	<picker-view :value="valArr" @change="popPickerChange" class="date-pck-view">
		<picker-view-column>
			<view class="pck-item" v-for="(item,index) in years" :key="index" :class="{'s-color':index == yIndex}">
				{{ (index>0?`${item}年`:'年')}}
			</view>
		</picker-view-column>
		<picker-view-column>
			<view class="pck-item" v-for="(item,index) in months" :key="index" :class="{'s-color':index == mIndex}">
				{{ (index>0?`${item}月`:'月')}}
			</view>
		</picker-view-column>
		<picker-view-column>
			<view class="pck-item" v-for="(item,index) in days" :key="index" :class="{'s-color': index == dIndex}">
				{{ (index>0?`${item}日`:'日')}}
			</view>
		</picker-view-column>
	</picker-view>
</template>

<script>
	export default {
		props: {
			valDate: { //标记的格式化日期,2020-11-12
				type: String,
				default: ''
			}
		},
		watch: {
			valDate: {
				immediate: true,
				deep: true,
				handler(newVal, oldVal) {
					setTimeout(() => { //延时,兼容h5,小程序无此问题
						const arr = newVal.split('-')
						let yd = this.years.findIndex(item => item == Number(arr[0]))
						let md = this.months.findIndex(item => item == Number(arr[1]))
						let dd = this.days.findIndex(item => item == Number(arr[2]))
						this.yIndex = yd == -1 ? 0 : yd
						this.mIndex = md == -1 ? 0 : md
						this.dIndex = dd == -1 ? 0 : dd
						this.valArr = [this.yIndex, this.mIndex, this.dIndex]
					}, 100);
				}
			}
		},
		data() {
			return {
				valArr: [], //标记的索引[0,0,0],年月日
				years: [],
				months: [],
				days: [],
				yIndex: 0,
				mIndex: 0,
				dIndex: 0
			};
		},
		created() {
			const date = new Date(Date.now())
			this.years = this.getYears()
			this.months = this.getMonths()
			this.days = this.getDays(date.getFullYear(), date.getMonth() + 1)
		},
		methods: {
			getYears() {
				const years = [0]
				const date = new Date()
				for (let i = 2020; i <= date.getFullYear(); i++) {
					years.push(i)
				}
				return years
			},
			getMonths() {
				return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
			},
			getDays(year, month) {
				let arr = [0];
				month = parseInt(month, 10);
				let temp = new Date(year, month, 0);
				var res = temp.getDate();
				for (let i = 1; i <= res; i++) {
					arr.push(i)
				}
				return arr;
			},
			popPickerChange(e) {
				const data = e.detail.value
				this.yIndex = data[0]
				this.mIndex = data[1]
				this.dIndex = data[2]
				this.valArr = [data[0], data[1], data[2]]
				let y = this.years[data[0]]
				let m = this.months[data[1]] >= 10 ? this.months[data[1]] : `0${this.months[data[1]]}`
				this.days = this.getDays(y, this.months[data[1]])
				let d = this.days[data[2]] >= 10 ? this.days[data[2]] : `0${this.days[data[2]]}`
				let selectdDate = `${y}-${m}-${d}`

				this.$emit('pckChange', {
					array: data,
					isDate: data[0] > 0 && data[1] > 0 && data[2] > 0, //返回值是否是日期，因为返回的格式有可能是：月和日，索引为0,0
					date: selectdDate
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.date-pck-view {
		background-color: white;
		height: 100%;
		width: 100%;

		.pck-item {
			text-align: center;
		}

		.s-color {
			color: #f66890;
		}
	}
</style>
