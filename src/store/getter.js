export default{
	addfilter: (state, obj) => {
		return state.user_list.filter(user => {
			if(JSON.stringify(obj).indexOf(JSON.stringify(user)) != -1){
				return false;
			}else{
				return true;
			}
		})
	}
}