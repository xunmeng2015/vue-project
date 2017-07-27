<template>
	<div class="new_inform">
		<div class="list">
			<ul class="all_list">
				<li class="gruop_list">
					<!-- 群组 -->
				</li>
				<li class="user_list">
					
				</li>
			</ul>
		</div>
		<div class="inform_area">
			<div>
				<br><br><p>你的称呼</p><input type="text" id="name" v-focus placeholder="默认为你的手机号码" /><br><br>
				<p>计划(活动)名称</p><input type="text" id="plan_name" /><span class="necessary">*</span><br><br>
				<p>开始时间</p><input type="text" id="time" /><span class="necessary">*</span><br>
				<span class="tip">*为必填项</span><br><br>
			</div>
		</div>
		<center>
			<input type="text" id="add_user" v-model="addNumber" v-bind:value="addNumber | phoneType" value="aaa" /><button class="add_btn" v-on:click="add">添加用户</button><br><br>
		<div class="informTo">
		<p>通知列表</p>
			<ul>
				<li v-for="(item, index) in items">{{item.phone}}<span v-on:click="remove(index)">&nbsp;&nbsp;&nbsp;删除</span></li>
			</ul>
		</div>
		
		</center>
		<input type="checkbox" name="time" id="oneDay" value="oneDay" v-model="selected"><label for="oneDay" class="timetip">提前一天通知</label><br>
		<input type="checkbox" name="time" id="threeHour" value="threeHour" v-model="selected"><label for="threeHour" class="timetip">提前三小时通知</label><br>
		<input type="checkbox" name="time" id="oneHour" value="oneHour" v-model="selected"><label for="oneHour" class="timetip">提前一小时通知</label>
		<!-- <p>{{ selected }}</p> -->
		<br><br><button v-on:click="sub" class="sub_btn">提交</button>
		<foot></foot>
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
				addNumber: "",
				items : [],
				selected: []
			}
		},
		components: {
			foot
		},
		beforeCreate: function(){
			document.title = "新建通知";
		},
		mounted: function(){
			
		},
		methods: {
			add: function(){
				var _this = this;
				if(!/^1\d{10}$/.test(_this.addNumber)){
					alert("请输入正确的号码");
				}else{
					_this.items.push({phone: _this.addNumber, name:"华华"})
				}
				_this.addNumber = "";
			},
			remove: function(idx){
				var _this = this;
				// alert(idx);
				_this.items.splice(idx, 1);
			},
			sub: function(){
				var _this = this;
				// console.log(_this.items);
				_this.items.map(function(item, index){
					console.log(item["name"] + " " + item["phone"]);
				});
				console.log(_this.selected);
				// console.log(_this.items[0]["name"]);
				// console.log(_this.items.length);
			}
		}
	}
</script>

<style scoped>
	.new_inform{
		width: 100%;
	}
	.inform_area p{
		display: inline-block;
		width: 110px;
		text-align: right;
		margin-right: 5px;
		height: 20px;
		line-height: 20px;
	}
	input{
		width: 30px;
		height: 20px;
	}
	.inform_area input{
		width: 170px;
		margin-left: 10px;
		height: 20px;
	}
	.tip{
		/*float: right;*/
		margin-left: 125px;
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
		margin-left:7px;
	}
	.timetip{
		float: right;
		margin-right: 10px;
	}
</style>