import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		add(state) {
			state.count += 1
		}
	},
	actions: {
		addCount(comtext) {
			comtext.commit('add')
		}
	}
})

export default store
