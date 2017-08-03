import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getter'

Vue.use(Vuex)

const state = {
	user_list:[{
		name:"11",
		phone: "18826103503"
	},
	{
		name:"22",
		phone: "18826103503"
	}],
	group_list:[],
	inform_history:[],
	sign: "",
	group_infor: {}
}

export default new Vuex.Store({
	state,
	mutations,
	getters
})