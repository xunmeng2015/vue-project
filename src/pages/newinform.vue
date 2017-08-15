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
				<p class="title">活动时间<!-- <span class="warn">(格式:yyyy-MM-dd hh:mm)</span> --><span class="necessary">*</span><span v-text="nonumber" v-if="wrong" class="warn"></span></p>
				<input type="date" id="time"  v-model="time"><input type="time" class="hour" v-model="hour"  @blur="blur"><!-- placeholder="如：2017-07-01 17:59" -->
			</div>
			<div class="box add_area">
				<p class="title">通知对象<span class="warn">(不填则只通知自己)</span></p>
				<input type="number" v-model="addPhone" placeholder="请输入手机号码">
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
				<div class="select_list">
					<p><input type="checkbox" name="time" id="oneDay" value="86400" v-model="selected"><label for="oneDay" class="timetip">活动前一天通知</label></p>
					<p><input type="checkbox" name="time" id="threeHour" value="10800" v-model="selected"><label for="threeHour" class="timetip">活动前三小时通知</label></p>
					<p><input type="checkbox" name="time" id="oneHour" value="3600" v-model="selected"><label for="oneHour" class="timetip">活动前一小时通知</label></p>
					<p><input type="checkbox" name="time" id="thirtmin" value="1800" v-model="selected"><label for="thirtmin" class="timetip">活动前30分钟通知</label></p>
					<hr>
					<p><input type="checkbox" name="time" id="fifmin" value="900" v-model="selected"><label for="fifmin" class="timetip">活动15分钟通知</label></p>
					<p><input type="checkbox" name="time" id="twoDay" value="172800" v-model="selected"><label for="twoDay" class="timetip">活动前两天通知</label></p>
					<p><input type="checkbox" name="time" id="threeDay" value="259200" v-model="selected"><label for="threeDay" class="timetip">活动前三天通知</label></p>
					<p><input type="checkbox" name="time" id="fiveDay" value="345600" v-model="selected"><label for="fiveDay" class="timetip">活动前五天通知</label></p>
					</div><button v-on:click="sub" class="sub_btn">提交</button>
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
				nonumber: "",
				hour: ""
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
					this.special1 = true;
				}else{
					this.special1 = false;
				}
			},
			name:function(){
				if(/[<>.*+-/"'!]/g.test(this.name)){
					this.special = true;
				}else{
					this.special = false;
				}
				if(this.name.length > 20){
					this.name = this.name.substr(0, 20);
				}
			},
			selected: function(){
				if(this.selected.length > 3){
					alert("最多只能选三个时间段!");
					this.selected = this.selected.slice(0, 3);
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
					this.groupselect = "";
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
				// console.log(this.groupselect);
				if(!this.wrong && !this.special1 && !this.special && this.title && this.time && this.hour && this.selected.length > 0){
					var dd = this.time + " " + this.hour;
					this.$http.post('/inform/setinform', {
					name: this.name,
					title: this.title,
					acttime: dd,
					actdate: Math.floor(new Date(dd.replace(/-/g, '/')) / 1000),
					fromsign: this.$route.params.sign,
					groupsign: this.groupselect,
					people: this.items.concat(this.fromlist),
					time: this.selected
					}).then((data) => {
						this.$set(this.$store.state.detail, data.body.informsign, {
							title: this.title,
							acttime: dd
						});
						var uu = JSON.parse(sessionStorage.getItem("history")).concat({
							title: this.title,
							acttime: dd
						});
						sessionStorage.setItem("history", JSON.stringify(uu));
						this.$store.commit('addinform', {
							title: this.title,
							informsign: data.body.informsign,
							acttime: dd,
							isign: 0
						});
						console.log(this.$store.state.history);
						this.$router.push({name:'first', params:{sign:this.$route.params.sign}});
					}, (err) => {
						// alert(new Date(dd).getTime());
						alert("发生错误");
					});
				}else{
					alert("信息不完整!");
				}
			},
			blur: function(){
				var dd = this.time + " " + this.hour;
				if(!/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}$/.test(dd)){
					this.wrong = true;
					this.nonumber = "格式出错!!";
				}else{
					if((new Date(dd.replace(/-/g, '/')).getTime().toString().indexOf("NaN")) > -1){
						this.nonumber = "时间不对!!";
						this.wrong = true;
					}else if((Math.floor(new Date(dd.replace(/-/g, '/')) / 1000) - Math.floor(new Date() / 1000)) < 3600){
						this.nonumber = "至少比现在晚一小时噢!";
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
				if(groupc.name){
					this.groups = [].concat({
						name: groupc.name + "(分组)",
						phone: groupc.name + "(分组)"
					});
					this.show = true;
					this.groupselect = groupc.groupsign;
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