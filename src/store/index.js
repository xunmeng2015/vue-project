import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	user_list:[{
		name:"华华",
		phone: "18826103503"
	},
	{
		name:"华华",
		phone: "18826103501"
	},
	{
		name:"华华",
		phone: "18826103502"
	}],
	group_list:[
	{
		name:"华华",
		phone: "18826103503"
	},
	{
		name:"华华",
		phone: "18826103503"
	},
	{
		name:"华华",
		phone: "18826103503"
	}],
	inform_history:[],
	sign: ""
}

export default new Vuex.Store({
	state,
	mutations
})