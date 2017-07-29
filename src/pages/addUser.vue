<template>
	<div class="container">
		<div class="box">
			<p class="title">昵称<span class="necessary">*</span></p>
			<input type="text" id="name" v-model="name">
			<p class="title">联系方式<span class="necessary">*</span><span v-if="wrong" class="wrong">格式出错!!</span></p>
			<input type="text" id="name" v-model="phone"  @blur="blur">
			<button class="add_btn" v-on:click="add">添加</button>
		</div>
		<foot></foot>
	</div>
</template>

<script>
import foot from '../components/foot'
	export default{
		data(){
			return {
				name:"",
				phone:"",
				wrong:false
			}
		},
		beforeCreate: function(){
			document.title = "新建联系人"
		},
		components: {
			foot
		},
		watch:{
			phone:function(){
				if(this.phone.length > 11){
					this.phone = this.phone.substr(0, 11);
				}
			},
			name:function(){
				if(this.name.length > 20){
					this.name = this.name.substr(0, 20);
				}
			}
		},
		methods:{
			blur:function(){
				var _this = this;
				if(!/1\d{10}/.test(_this.phone)){
					_this.wrong = true;
				}else{
					_this.wrong = false;
				}
			},
			add: function(){
				var _this = this;
				if(!_this.wrong && _this.name){
					if(confirm("确定添加吗")){
						console.log(_this.name + " " + _this.phone);
						_this.$store.state.user_list.push({
							name:_this.name,
							phone:_this.phone
						})

					}else{return;}
				}
				else{
					alert("信息不完全！");
				}
			}
		}
	}
</script>

<style scoped>
	.box{
		height: auto;
		background-color: white;
		padding: 10px;
		border-radius: 5px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
		box-shadow: 0px 0px 10px 1px lightgray;
	}
	.title{
		font-size: 15px;
		color: green;
		margin-bottom: 3px;
	}
	.box input{
		border: none;
		border-bottom: 1px solid black;
		width: 100%;
		outline: none;
		margin-bottom: 10px;
	}
	.add_btn{
		width: 100%;
		height: 30px;
		font-size: 16px;
	}
	.necessary{
		color: red;
		font-size: 18px;
	}
	.wrong{
		color: red;
	}
</style>