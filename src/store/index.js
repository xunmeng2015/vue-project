import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	user_list:[],
	group_list:[],
	inform_history:[]
}

export default new Vuex.Store({
	state,
	mutations
})