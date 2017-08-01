<template>
		<div class="container" v-if="show" v-on:click="hide">
		<div v-on:click="prevent($event)">
			<div class="show">
				<p class="title">昵称<span v-if="special" class="wrong">   昵称不能包含<>.*+-/"'</span></p>
				<input type="text" id="name" v-model="name" :disabled="disabled">
				<p class="title">联系方式<span v-if="wrong" class="wrong">格式出错!!</span></p>
				<input type="number" id="name" v-model="phone" :disabled="disabled">
				<button class="add_btn" v-on:click="change" v-text="btntext"></button>
				<span class="remove" v-on:click="remove">点击删除</span>
			</div>
			<button style="width:250px;background-color:white;border:solid 1px white;margin-top:5px;" v-on:click="sub">确定</button>
			</div>
		</div>
</template>

<script>
// import Vuex from "Vuex"
// import Vue from "vue"
// Vue.use(Vuex)
// var infor = new Vuex.Store({
// 	state: {
// 		userinfor: {}
// 	},
// 	mutations:{
// 		insert(state, num, obj){
// 			state.userinfor[num] = obj;
// 		},
// 		update(state, num, obj){
// 			state.userinfor[num] = obj;
// 		}
// 	}
// });
	export default{
		props: ["show", "name", "phone", "idx"],
			data(){
				return{
					wrong:false,
					special:false,
					disabled:true,
					btntext: "修改",
					changename: "",
					changephone: ""
				}
			},
			methods:{
				sub:function(){
					if(!this.wrong && this.name && this.phone && !this.special){
							console.log(this.name);
							console.log(this.phone);
							console.log(this.idx);
							console.log(this.$store.state.user_list[this.idx].name);
						}else{
							alert("输入有误");
						}
				},
				change:function(){
					this.disabled = !this.disabled;
					if(!this.disabled){
						this.btntext = "取消"
					}else{
						this.btntext = "修改"
						this.changephone = this.phone;
						this.changename = this.name;
					}
				},
				remove:function(){
					console.log();
				},
				hide: function(){
					this.disabled = true;
					this.btntext = "修改";
					this.$emit('hide');
				},
				prevent: function(e){
					e.stopPropagation();
				}
			},
		watch:{
			changephone:function(){
				if(!/1\d{10}/.test(this.changephone)){
					this.wrong = true;
				}else{
					this.wrong = false;
				}
				if(this.changephone.length > 11){
					this.changephone = this.changephone.substr(0, 11);
				}
			},
			changename:function(){
				if(/[<>.*+-/"'!]/g.test(this.changename)){
					// this.name = this.name.length > 15 ? this.name.substr(0, 15) : this.name.substr(0, this.name.length - 1);;
					this.special = true;
				}else{
					this.special = false;
				}
				if(this.changename.length > 20){
					this.changename = this.changename.substr(0, 20);
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
		height: 140px;
		background-color: white;
		overflow: hidden;
		padding-top: 5px;
	}
	.title{
		font-size: 15px;
		color: green;
		margin-bottom: 3px;
		padding-left: 5px;
	}
	input{
		border: none;
		border-bottom: 1px solid black;
		width: 100%;
		outline: none;
		margin-bottom: 10px;
		padding-left: 5px;
	}
	.add_btn{
		width: 100%;
		height: 25px;
		font-size: 16px;
		border:1px solid #F7F7F7;
		background-color: #F7F7F7;
	}
	.wrong, .special{
		color: red;
		font-size: 13px;
	}
	.remove{
		color: blue;
		font-size: 14px;
		float: right;
		margin-top: 5px;
	}
	:disabled{
		background-color: #F7F7F7;
	}
</style>