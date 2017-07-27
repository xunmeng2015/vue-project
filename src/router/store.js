import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		user_list: [{
					name:"华华",
					phone:"18826103503"
				},
				{
					name:"华华",
					phone:"18826103503"
				}],
		group_list: [{name:"华华"}],
		inform_his: []
	},
	mutations:{
		insertUser(state, obj){
			state.user_list.push(obj);
		},
		removeUser(state, idx){
			state.user_list.splice(idx, 1);
		},
		addGroup(state, obj){
			state.group_list.push(obj);
		},
		removeGroup(state, idx){
			state.group_list.splice(idx, 1);
		}
	}
});

export default new Vuex.Store({
	store
})