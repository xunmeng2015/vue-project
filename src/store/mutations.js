export default{
	savesign(state, s){		//保存用户标识
		state.sign = s;
	},
	update(state, n){
		state.group_list.push({
			name:n,
			phone:"18826103503"
		})
	},
	removeuser(statr, idx){		//删除好友
		state.user_list.slice(idx, 1);
	},
	adduser(state, obj){		//增加好友
		state.user_list.push(obj);
	},
	removegroup(state, idx){		//删除分组
		state.group_list.slice(idx, 1);
	},	
	addgroup(state, obj){		//新建分组
		state.group_list.push(obj);
	}
}