import Vue from 'vue'
import App from './App'
import utils from '@/utils/index.js'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$utils = utils
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
