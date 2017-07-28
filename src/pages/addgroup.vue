<template>
	<div class="container">
		<div class="box">
			<p class="title">分组名称<span class="necessary">*</span></p>
			<input type="text" id="name" v-model="name">
				<p class="title">添加对象</p>
				<input type="text" id="time" v-model="addPhone" placeholder="请输入手机号码">
				<button class="add_btn" v-on:click="add">添加</button>
		</div>
		<div class="userList" v-if="show">
				<ul>
					<li v-for="(item, index) in items">{{item.phone}}<span v-on:click="remove(index)" class="remove">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span></li>
				</ul>
		</div>
		<br style="clear:both">
		<button v-on:click="sub" class="sub-btn">提交</button><br>
		<foot></foot>
	</div>
</template>

<script>
import foot from '../components/foot'
	export default{
		data(){
			return {
				name:"",
				addPhone:"",
				items:[],
				show:false
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
				if(!/^1\d{10}$/.test(_this.addPhone)){
					alert("请输入正确的号码");
				}else{
					_this.items.push({phone: _this.addPhone});
					_this.show = true;
				}
				_this.addPhone = "";
			},
			remove: function(idx){
				var _this = this;
				_this.items.splice(idx, 1);
				if(_this.items.length == 0){
					_this.show = false;
				}
			},
			sub: function(){
				var _this = this;
				_this.items.map(function(item, index){
					console.log(item["phone"]);
				});
			}
		}
	}
</script>

<style scoped>
.container{
	width:100%;
}
	.box{
		height: auto;
		background-color: white;
		padding: 10px;
		border-radius: 5px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
		box-shadow: 0px 0px 10px 1px lightgray;
		z-index: 2;
		position: relative;
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
	.userList{
		width: 90%;
		height: auto;
		background-color: white;
		z-index: 1;
		margin: 0 auto;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: 1px 1px 10px 1px lightgray;
		padding-top: 10px;
		text-align: center;
	}
	.remove{
		color: red;
		float: right;
		margin-right: 10px;
	}
	.sub-btn{
		width: 90%;
		margin-left: 5%;
		height: 30px;
		font-size: 16px;
	}
</style>