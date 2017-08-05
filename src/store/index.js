import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getter'

Vue.use(Vuex)

const state = {
	user_list:[],
	group_list:[],
	history:[],
	sign: "",
	group_infor: {},
	detail: {}
}

export default new Vuex.Store({
	state,
	mutations,
	getters
})