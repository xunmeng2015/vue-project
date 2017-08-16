<template>
	<div class="list">
	<div style="padding-bottom:60px;">
	<input class="search" type="text" v-bind:style="input" v-on:focus="focus" v-on:blur="blur" placeholder="搜索号码或名字" />
	<router-link :to="{name:'adduser', params:{sign: this.$route.params.sign}}"><span class="group">添加联系人<i class="right"></i></span></router-link><br>
	<router-link :to="{name:'addgroup', params:{sign: this.$route.params.sign}}"><span class="group">添加分组<i class="right"></i></span></router-link><br><br>
	<span class="group" style="color: green;" v-on:click="fanzhuan">分组<i v-bind:class="['right', {'up': up},{'bottom': !up}]"></i></span><br>
		<ul v-if="seen">
				<li v-for="(group, index) in groups" v-on:click="showgroup(group.name, group.groupsign, index)">{{group.name}}</li>
		</ul>
		<p class="list_head">联系人</p>
		<ul>
			<li v-for="(item, index) in items" v-on:click="detail(index, item.name, item.phone)">{{item.name}}</li>
		</ul>
		<div class="container" v-if="show" v-on:click="hide">
			<div v-on:click="prevent($event)" class="infor-area">
				<div class="show">
					<p class="title">昵称<span v-if="special" class="wrong">   昵称不能包含<>.*+-/"'!</span></p>
					<input type="text" id="name" v-model="changename" :disabled="disabled">
					<p class="title">联系方式<span v-if="wrong" class="wrong">格式出错!!</span></p>
					<input type="number" id="name" v-model="changephone" :disabled="disabled">
					<button class="add_btn" v-on:click="change" v-text="btntext"></button>
					<span class="remove" v-on:click="remove">点击删除</span>
				</div>
				<button class="change-btn" v-on:click="sub">确定</button>
			</div>
		</div>
		</div>
		<member :showmember="showmember" :currgroup="currgroup" :currsign="currsign" :currname="currname" :curridx="curridx" v-on:hidemember="hidemember"></member>
		<keep-alive>
			<foot></foot>
		</keep-alive>
	</div>
</template>

<script>
	import foot from '../components/foot'
	import member from '../components/member'
	export default{
		data(){
			return {
				items:(this.$store.state.user_list.length > 0) ? this.$store.state.user_list : JSON.parse(sessionStorage.getItem('user_list')),
				input: {
					width: window.innerWidth - 25 + "px",
				},
				showmember: false,
				currgroup: [],		//当前列表的成员
				currsign: "",
				curridx: "",
				currname: "",
				up: true,
				seen: false,
				groups:(this.$store.state.group_list.length > 0) ? this.$store.state.group_list : JSON.parse(sessionStorage.getItem('group_list')),
				show: false,			//联系人信息是否显示
				wrong:false,			//号码格式错误显示
				special:false,			//名字格式错误显示
				disabled:true,			//输入框操作性
				btntext: "点击修改",		//按钮文本
				changename: "",			//输入框值
				changephone: "",		//号码值	
				idx: "",				//点击的index
				tempname:"",			//临时name
				tempphone:""			//临时phone
			}
		},
		components: {
			foot,
			member
		},
		beforeCreate: function(){
			document.title = "小信使";
		},
		mounted: function(){
			if(this.$store.state.user_list.length == 0){
				this.$store.commit('setuser', !sessionStorage.getItem('user_list') ? [] : JSON.parse(sessionStorage.getItem('user_list')));
			}
			if(this.$store.state.user_list.length == 0){
				this.$store.commit('setgroup', !sessionStorage.getItem('group_list') ? [] : JSON.parse(sessionStorage.getItem('group_list')));
			}
			if(this.$store.state.user_list.length == 0 && !sessionStorage.getItem('user_list')){
				this.$http.post('/inform/getuserinform', {
					sign: this.$route.params.sign
				}).then((data) => {
					this.$store.commit('setuser', data.body.friend);
					this.$store.commit('setgroup', data.body.group);
					sessionStorage.setItem("user_list", JSON.stringify(data.body.friend));
					sessionStorage.setItem("group_list", JSON.stringify(data.body.group));
				}, (err) => {
					alert("获取用户信息失败");
				});
			}
		},
		methods:{
			focus: function(){
				this.input = {
					width: window.innerWidth - 25 + "px",
					textAlign: "left"
				}
			},
			blur: function(){			//搜索框移除焦点事件
				this.input = {
					width: window.innerWidth - 25 + "px",
					textAlign: "center"
				}
			},
			fanzhuan:function(){		//分组指引反转函数
				this.up = !this.up;
				this.seen = !this.seen;
			},
			hidemember: function(){
				this.showmember = false;
			},
			detail: function(idx, name, phone){		//点击联系人跳出函数
				this.changename = name;
				this.changephone = phone;
				this.tempname = name;
				this.tempphone = phone;
				this.idx = idx;
				this.show = true;
			},
			hide: function(){			//隐藏联系人函数
				this.show = false;
				this.disabled = true;
				this.btntext = "点击修改";
				this.$emit('hide');
			},
			prevent: function(e){			//阻止事件冒泡
				e.stopPropagation();
			},
			change:function(){				//改变输入框可操作性
				this.disabled = !this.disabled;
				if(!this.disabled){
					this.btntext = "点击取消"
				}else{
					this.btntext = "点击修改"
					this.changename = this.tempname;
					this.changephone = this.tempphone;
				}
			},
			remove:function(){				//删除联系人
				if(confirm("确定删除吗?")){
					this.changephone = this.tempphone;
					this.$http.post("/inform/removeuser", {
						phone: this.changephone,
						sign: this.$route.params.sign
					}).then((data) => {
						console.log(data);
						if(data.body.result == "success"){
							alert("删除成功");
							this.show = false;
							this.disabled = true;
							this.btntext = "点击修改";
							this.$store.commit('removeuser', this.idx);
							sessionStorage.setItem("user_list", JSON.stringify(this.$store.state.user_list));
						}else{
							alert("删除失败");
						}
					}, (err) => {
						alert("发生错误");
					});
				}
			},
			sub:function(){					//提交函数
			if(!this.wrong && this.changephone && this.changename && !this.special){
				if(this.changename != this.tempname || this.changephone != this.tempphone){
					if(confirm("确定修改吗?")){
						this.$http.post("/inform/updateuser", {
							sign: this.$route.params.sign,
							name: this.tempname,
							phone: this.tempphone,
							newname: this.changename,
							newphone: this.changephone
						}).then((data) => {
							if(data.body.result == "success"){
								this.show = false;
								this.disabled = true;
								this.btntext = "点击修改";
								this.$store.commit('updateuser',{obj:{
									name: this.changename,
									phone: this.changephone
								}, idx:this.idx});
								sessionStorage.setItem("user_list", JSON.stringify(this.$store.state.user_list));
								alert("修改成功");
							}else{
								this.show = false;
								this.disabled = true;
								this.btntext = "点击修改";
								alert("修改失败");
							}
						}, (err) => {
								console.log(err);
								this.show = false;
								this.disabled = true;
								this.btntext = "点击修改";
								alert("发生错误");
						});
					}
				}else{
					this.show = false;
					this.disabled = true;
					this.btntext = "点击修改";
					this.$emit('hide');
				}
			}else{
					alert("输入有误");
				}
			},
			showgroup: function(name, sign, index){
				if(!this.$store.state.group_infor[sign]){
					this.$http.post('/inform/getmember', {
						sign: this.$route.params.sign,
						groupsign: sign
					}).then((data) => {
						this.showmember = true;
						this.currsign = sign;
						this.$set(this.$store.state.group_infor, sign, data.body.member);
						this.currgroup = data.body.member;
						this.curridx = index;
						this.currname = name;
					}, (err) => {

					});
				}else{
					this.showmember = true;
					this.currsign = sign;
					this.currgroup = this.$store.state.group_infor[sign];
					this.curridx = index;
					this.currname = name;
				}
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
				if(/[<>.*+-/"']/g.test(this.changename)){
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

<style src="../assets/css/list.css" scoped>
	
</style>