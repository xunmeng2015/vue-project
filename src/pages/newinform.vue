<template>
	<div class="new_inform">
		<div class="input_area">
			<div class="box">
				<p class="title">你的称呼<span v-if="special" class="warn">   不能包含<>.*+-/"'!</span></p>
				<input type="text" id="name" v-model="name" placeholder="不填则默认自己的号码">
			</div>
			<div class="box">
				<p class="title">计划(活动)名称<span class="necessary">*</span><span v-if="special1" class="warn">   不能包含<>.*+-/"'!</span></p>
				<input type="text" id="title" v-model="title">
			</div>
			<div class="box">
				<p class="title">活动时间<span class="warn">(格式:yyyy-MM-dd hh:mm)</span><span class="necessary">*</span><span v-if="wrong">格式出错!!</span></p>
				<input type="text" id="time" placeholder="如：2017-07-01 17:59" v-model="time" @blur="blur">
			</div>
			<div class="box add_area">
				<p class="title">通知对象<span class="warn">(不填则只通知自己)</span></p>
				<input type="text" id="time" v-model="addPhone" placeholder="请输入手机号码">
				<button class="add_btn" v-on:click="add">添加</button>
				<span class="list" v-on:click="chooselist">从通讯录选择</span>
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
		<chooselist :showlist="showlist" v-on:hide="hide"></chooselist>
		<keep-alive>
			<foot></foot>
		</keep-alive>
	</div>
</template>

<script>
import foot from '../components/foot'
import chooselist from '../components/chooselist'
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
				wrong:false,
				showlist:false,
				special: false,
				special1:false
			}
		},
		components: {
			foot,
			chooselist
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
				if(/[<>.*+-/"'!]/g.test(this.title)){
					// this.name = this.name.length > 15 ? this.name.substr(0, 15) : this.name.substr(0, this.name.length - 1);;
					this.special1 = true;
				}else{
					this.special1 = false;
				}
			},
			name:function(){
				if(/[<>.*+-/"'!]/g.test(this.name)){
					// this.name = this.name.length > 15 ? this.name.substr(0, 15) : this.name.substr(0, this.name.length - 1);;
					this.special = true;
				}else{
					this.special = false;
				}
				if(this.name.length > 20){
					this.name = this.name.substr(0, 20);
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
				if(!/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}$/.test(_this.time)){
					// console.log("wrong");
					_this.wrong = true;
					_this.time = "";
				}else{
					_this.wrong = false;
				}
			},
			chooselist: function(){
				var _this = this;
				_this.showlist = true;
			},
			hide: function(){
				var _this = this;
				_this.showlist = false;
			}
		}
	}
</script>

<style  src="../assets/css/inform.css" scoped>

</style>