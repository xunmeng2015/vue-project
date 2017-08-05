export default{
	savesign(state, value){		//保存用户标识
		state.sign = value;
	},
	updateuser(state, obj, idx){
		state.user_list.splice(idx, 1, obj);
	},
	removeuser(state, idx){		//删除好友
		state.user_list.splice(idx, 1);
	},
	adduser(state, obj){		//增加好友
		state.user_list.push(obj);
	},
	removegroup(state, idx){		//删除分组
		state.group_list.splice(idx, 1);
	},
	removemember(state, sign, idx){
		console.log(state.group_infor[sign].splice(idx, 1));
	},
	addgroup(state, obj){		//新建分组
		state.group_list.push(obj);
	},
	addmember(state, obj, sign){
		console.log(state.group_infor[sign]);
		state.group_infor[sign].push(obj);
	},
	setuser(state, obj){
		state.user_list = obj;
	},
	setgroup(state, obj){
		state.group_list = obj;
	},
	setinform(state, obj){
		state.history = obj;
	},
	addinform(state, obj){
		state.history.push(obj);
	}
}