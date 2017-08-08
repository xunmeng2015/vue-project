<template>
		<div class="container" v-if="showmember" v-on:click="hide">
			<div class="show" v-on:click="prevent($event)">
				<div class="list">
					<ul>
						<li v-for="(item, index) in currgroup"><i class="title">{{ item.name }}</i>
						<span class="userp">{{ item.phone }}</span><button class="delete" v-on:click="remove(item.name, item.phone, index)">删除</button></li>
					</ul>
				</div>
				<div class="bottom">
					<input type="text" v-model="name" placeholder="昵称" class="name">
					<input type="number" v-model="phone" placeholder="输入号码" class="phone">
					<button v-on:click="sub">添加</button>
				</div><button class="remove" v-on:click="removegroup">删除分组</button>
			</div>
		</div>
</template>

<script>
	export default{
		props: ["showmember", "idx", "currgroup", "currsign", "curridx", "currname"],
			data(){
				return{
					name:"",
					phone: ""
				}
			},
			methods:{
				sub:function(){
					if(this.name && this.phone){
						if(!/1\d{10}/.test(this.phone)){
							alert("号码有误!");
						}
						else if(/[<>.*+-/"'!]/g.test(this.name)){
							alert("名字包含<>.*+-\"'!");
						}else{
							if(confirm("确定添加吗")){
								this.$http.post('/inform/addmember', {
								name: this.name,
								phone: this.phone,
								fromsign: this.$route.params.sign,
								groupsign: this.currsign,
								groupname: this.currname
							}).then((data) => {
								if(data.body.result == "success"){
									this.currgroup.push({name: this.name, phone: this.phone});
									this.name = "";
									this.phone = "";
								}else{
									alert("添加失败");
								}
							}, (err) => {
								alert("发生错误!");
							})
							}
						}
					}else{
						alert("信息不完整!");
					}
				},
				remove:function(name, phone, idx){
					if(confirm('确定删除吗?')){
						this.$http.post('/inform/removemember', {
							name: name,
							phone: phone,
							fromsign: this.$route.params.sign,
							groupsign: this.currsign
						}).then((data) => {
							console.log(data);
							if(data.body.result == "success"){
								this.$store.commit('removemember', this.currsign, idx);
							}else{
								alert("删除失败");
							}
						}, (err) => {
							alert("发生错误!");
						})
					}
				},
				hide: function(){
					this.$emit('hidemember');
				},
				prevent: function(e){
					e.stopPropagation();
				},
				removegroup: function(){
					console.log(this.curridx);
					if(confirm('确定删除分组吗!?')){
						this.$http.post('/inform/removegroup', {
							fromsign: this.$route.params.sign,
							groupsign: this.currsign
						}).then((data) => {
							if(data.body.result == "success"){
								this.$store.commit('removegroup', this.curridx);
								sessionStorage.setItem("user_list", JSON.stringify(this.$store.state.group_list));
								this.$emit('hidemember');
							}else{
								alert("删除失败");
							}
						}, (err) => {
							alert("发生错误!");
						})
					}
				}
			},
		watch:{
			phone:function(){
				if(this.phone.length > 11){
					this.phone = this.phone.substr(0, 11);
				}
			},
			name:function(){
				if(this.name.length > 15){
					this.name = this.name.substr(0, 15);
				}
			}
		},
	}
</script>

<style scoped>
	.container{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
		-webkit-overflow-scrolling: touch;
		background-color: rgba(0, 0, 0, 0.3); 
		z-index: 9;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.show{
		width: 250px;
		height: 300px;
		background-color: white;
		overflow: hidden;
		padding-top: 5px;
		position: relative;
	}
	li{
		height: 27px;
		line-height: 27px;
		margin-bottom: 5px;
		margin-left: 5px;
		margin-right: 5px;
	}
	.list{
		height: 249px;
		overflow-y:scroll;
	}
	.bottom{
		display: flex;
		height: 30px;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: space-around;
		position: relative;
		bottom: 0;
		overflow: hidden;
	}
	.title{
		width: 60px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: inline-block;
	}
	input{
		border: none;
		display: inline-block;
		border-bottom: 1px solid black;
		width: 100%;
		outline: none;
		margin-top: 5px;
	}
	.name{
		width: 60px;
		font-size: 12px;
	}
	.phone{
		width: 105px;
		font-size: 12px;
	}
	.remove{
		height: 25px;
		margin-top: -5px;
		width: 100%;
	}
	.userp{
		overflow: hidden;
		display: inline-block;
		text-align: center;
	}
	.delete{
		float: right;
		}
</style>