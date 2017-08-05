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
				<p class="title">活动时间<span class="warn">(格式:yyyy-MM-dd hh:mm)</span><span class="necessary">*</span><span v-text="nonumber" v-if="wrong" class="wrong"></span></p>
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
						<li v-for="(group, index) in groups"><span class="name">{{group.name}}</span>{{group.phone}}<span v-on:click="remove('groups', index)" class="remove">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span></li>
						<li v-for="(list, index) in fromlist"><span class="name">{{list.name}}</span>{{list.phone}}<span v-on:click="remove('fromlist', index)" class="remove">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span></li>
						<li v-for="(item, index) in items"><span class="name">{{item.name}}</span>{{item.phone}}<span v-on:click="remove('items', index)" class="remove">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span></li>
					</ul>
				</div>
			<div class="select_box">
				<p><input type="checkbox" name="time" id="oneDay" value="86400" v-model="selected"><label for="oneDay" class="timetip">提前一天通知</label></p>
				<p><input type="checkbox" name="time" id="threeHour" value="10800" v-model="selected"><label for="threeHour" class="timetip">提前三小时通知</label></p>
				<p><input type="checkbox" name="time" id="oneHour" value="3600" v-model="selected"><label for="oneHour" class="timetip">提前一小时通知</label></p>
				<button v-on:click="sub" class="sub_btn">提交</button>
			</div>
		</div>
		<keep-alive>
			<chooselist :showlist="showlist" v-on:hide="hide" :showgroup="showgroup" v-on:concat="fromchild"></chooselist>
		</keep-alive>
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
				special1:false,
				showgroup:true,
				groupselect: "",
				groups: [],
				fromlist: [],
				nonumber: ""
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
				if(!/^1\d{10}$/.test(this.addPhone)){
					alert("请输入正确的号码");
				}else{
					this.items.push({phone: this.addPhone, name:this.addPhone});
					this.show = true;
				}
				this.addPhone = "";
			},
			remove: function(name, idx){
				if(name == "groups"){
					this.groups.splice(idx, 1);
				}else if(name == "fromlist"){
					this.fromlist.splice(idx, 1);
				}else{
					this.items.splice(idx, 1);
				}
				if(this.items.length == 0 && this.groups.length == 0 && this.fromlist.length == 0){
					this.show = false;
				}
			},
			sub: function(){
				if(!this.wrong && !this.special1 && !this.special && this.title && this.time && this.selected.length > 0){
					this.$http.post('/inform/setinform', {
					name: this.name,
					title: this.title,
					acttime: this.time,
					actdate: Math.floor(new Date(this.time) / 1000),
					fromsign: this.$route.params.sign,
					groupsign: this.groupselect,
					people: this.items.concat(this.fromlist),
					time: this.selected
					}).then((data) => {
						console.log(data);
						this.$set(this.$store.state.detail, data.body.informsign, {
							title: this.title,
							acttime: this.time
						});
						this.$store.commit('addinform', {
							title: this.title,
							acttime: this.time
							// informsign: data.body.informsign
						});
						this.$router.push({name:'first', params:{sign:this.$route.params.sign}});
					}, (err) => {
						alert("发生错误");
						console.log(err);
					});
				}else{
					alert("信息不完整!");
					console.log(this.$store.state.sign);
					console.log(this.$store.state);
				}
				// console.log(this.selected);
			},
			blur: function(){
				if(!/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}$/.test(this.time)){
					// console.log("wrong");
					this.wrong = true;
					// this.time = "";
					this.nonumber = "格式出错!!";
				}else{
					if((new Date(this.time).getTime().toString().indexOf("NaN")) > -1){
						this.nonumber = "时间不对!!";
						this.wrong = true;
					}else if((Math.floor(new Date(this.time) / 1000) - Math.floor(new Date() / 1000)) < 3600){
						this.nonumber = "提前一小时!";
						this.wrong = true;
					}else{
					this.wrong = false;
					}
				}
			},
			chooselist: function(){
				this.showlist = true;
			},
			hide: function(){
				this.showlist = false;
			},
			fromchild: function(userc, groupc){
				console.log(groupc);
				if(groupc.name){
					this.groups = [].concat({
						name: groupc.name + "(分组)",
						phone: groupc.name + "(分组)"
					});
					this.show = true;
					this.groupselect = groupc.groupsign;
					console.log(this.groupselect);
				}
				if(userc.length > 0){
					this.fromlist = userc;
					this.show = true;
				}
			}
		}
	}
</script>

<style  src="../assets/css/inform.css" scoped>

</style>