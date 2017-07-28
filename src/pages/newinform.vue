<template>
	<div class="new_inform">
		<div class="input_area">
			<div class="box">
				<p class="title">你的称呼</p>
				<input type="text" id="name" v-model="name">
			</div>
			<div class="box">
				<p class="title">计划(活动)名称<span class="necessary">*</span></p>
				<input type="text" id="title" v-model="title">
			</div>
			<div class="box">
				<p class="title">活动时间<span class="warn">(格式:yyyy-MM-dd hh:mm:ss)</span><span class="necessary">*</span><span v-if="wrong">格式出错!!</span></p>
				<input type="text" id="time" placeholder="如：2017-07-01 17:00:00" v-model="time" @blur="blur">
			</div>
			<div class="box add_area">
				<p class="title">通知对象<span class="warn">(不填则只通知自己)</span></p>
				<input type="text" id="time" v-model="addPhone" placeholder="请输入手机号码">
				<button class="add_btn" v-on:click="add">添加</button>
			</div>
			<div class="userList" v-if="show">
					<ul>
						<li v-for="(item, index) in items">{{item.phone}}<span v-on:click="remove(index)" class="remove">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span></li>
					</ul>
				</div>
			<div class="select_box">
				<p><input type="checkbox" name="time" id="oneDay" value="oneDay" v-model="selected"><label for="oneDay" class="timetip">提前一天通知</label></p>
				<p><input type="checkbox" name="time" id="threeHour" value="threeHour" v-model="selected"><label for="threeHour" class="timetip">提前三小时通知</label></p>
				<p><input type="checkbox" name="time" id="oneHour" value="oneHour" v-model="selected"><label for="oneHour" class="timetip">提前一小时通知</label></p>
				<button v-on:click="sub" class="sub_btn">提交</button>
			</div>
		</div>
		<keep-alive>
			<foot></foot>
		</keep-alive>
	</div>
</template>

<script>
import foot from '../components/foot'
import Vue from 'vue'
Vue.directive("focus",{
		inserted: function(el){
			el.focus();
		}
	});
Vue.filter('phoneType', function(value){
	if(value.length > 11){
		return value.substr(0, 11);
	}
	return value;
});
	export default{
		data() {
			return{
				addPhone: "",
				items : [],
				selected: [],
				show: false,
				title:"",
				name:"",
				time:"",
				wrong:false
			}
		},
		components: {
			foot
		},
		beforeCreate: function(){
			document.title = "新建通知";
		},
		watch:{
			addPhone:function(){
				if(this.addPhone.length > 11){
					this.addPhone = this.addPhone.substr(0, 11);
				}
			},
			title:function(){
				if(this.title.length > 20){
					this.title = this.title.substr(0, 20);
				}
			},
			name:function(){
				if(this.title.length > 20){
					this.title = this.title.substr(0, 20);
				}
			},
			time:function(){
				if(this.time.length > 30){
					this.time = this.time.substr(0, 30);
				}
			}
		},
		methods: {
			add: function(){
				var _this = this;
				if(!/^1\d{10}$/.test(_this.addPhone)){
					alert("请输入正确的号码");
				}else{
					_this.items.push({phone: _this.addPhone, name:"华华"});
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
					console.log(item["name"] + " " + item["phone"]);
				});
				_this.selected.map(function(i){
					console.log(i);
				});
			},
			blur: function(){
				var _this = this;
				if(!/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/.test(_this.time)){
					// console.log("wrong");
					_this.wrong = true;
					_this.time = "";
				}else{
					_this.wrong = false;
				}
			}
		}
	}
</script>

<style scoped>
.new_inform{
		width: 100%;
	}
	input{
		height: 20px;
	}
	button{
		height: 26px;
	}
	.necessary{
		color: red;
		font-size: 18px;
	}
	#add_user{
		width: 100px;
	}
	.sub_btn{
		width: 100%;
	}
	.timetip{
		float: right;
		margin-right: 10px;
	}
	.box{
		height: 40px;
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
	}
	.warn{
		font-size: 12px;
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
	.user{
		margin-top: none;
	}
	.add_area{
		position: relative;
		height: 80px;
		z-index: 2;
	}
	.add_btn{
		width: 100%;
		margin-top: 10px;
	}
	.select_box{
		height: auto;
		background-color: white;
		padding: 10px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
	}
	.select_box p{
		height: 30px;
		line-height: 30px;
	}
	.remove{
		color: red;
	}
</style>