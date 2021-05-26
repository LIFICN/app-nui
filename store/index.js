import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		count: 1
	},
	getters: {
		count: state => state.count
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
