<template>
	<div class="list">
	<!-- <top></top> -->
	<input class="search" type="text" v-bind:style="input" v-on:focus="focus" v-on:blur="blur" placeholder="搜索号码或名字" />
	<router-link :to="{name:'adduser', params:{sign: this.$route.params.sign}}"><span class="group">添加联系人<i class="right"></i></span></router-link><br>
	<router-link :to="{name:'addgroup', params:{sign: this.$route.params.sign}}"><span class="group">添加分组<i class="right"></i></span></router-link><br><br>
	<span class="group" v-on:click="fanzhuan">分组<i v-bind:class="['right', {'up': up},{'bottom': !up}]"></i></span><br>
		<ul v-if="seen">
				<li v-for="group in groups">{{group.name}}</li>
		</ul>
		<p style="font-size:15px;height:20px;line-height:20px;margin-left: 10px;margin-top:5px;margin-bottom:5px;color:gray">联系人</p>
		<ul>
			<li v-for="(item, index) in items" v-on:click="detail(index, item.name, item.phone)">{{item.name}}</li>
		</ul>

		<div class="container" v-if="show" v-on:click="hide">
			<div v-on:click="prevent($event)">
			<div class="show">
				<p class="title">昵称<span v-if="special" class="wrong">   昵称不能包含<>.*+-/"'!</span></p>
				<input type="text" id="name" v-model="changename" :disabled="disabled">
				<p class="title">联系方式<span v-if="wrong" class="wrong">格式出错!!</span></p>
				<input type="number" id="name" v-model="changephone" :disabled="disabled">
				<button class="add_btn" v-on:click="change" v-text="btntext"></button>
				<span class="remove" v-on:click="remove">点击删除</span>
			</div>
			<button style="width:250px;background-color:white;border:solid 1px white;margin-top:5px;" v-on:click="sub">确定</button>
			</div>
		</div>

		<keep-alive>
			<foot></foot>
		</keep-alive>
	</div>
</template>

<script>
	import foot from '../components/foot'
	import top from '../components/top'
	export default{
		data(){
			return {
				items:this.$store.state.user_list,
				input: {
					width: window.innerWidth - 25 + "px",
				},
				up: true,
				seen: false,
				groups:this.$store.state.group_list,
				show: false,			//联系人信息是否显示
				wrong:false,			//号码格式错误显示
				special:false,			//名字格式错误显示
				disabled:true,			//输入框操作性
				btntext: "修改",			//按钮文本
				changename: "",			//输入框值
				changephone: "",		//号码值	
				idx: "",				//点击的index
				tempname:"",			//临时name
				tempphone:""			//临时phone
			}
		},
		components: {
			foot,
			top
		},
		beforeCreate: function(){
			document.title = "小信使"
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
				this.btntext = "修改";
				this.$emit('hide');
			},
			prevent: function(e){			//阻止事件冒泡
				e.stopPropagation();
			},
			change:function(){				//改变输入框可操作性
				this.disabled = !this.disabled;
				if(!this.disabled){
					this.btntext = "取消"
				}else{
					this.btntext = "修改"
					this.changename = this.tempname;
					this.changephone = this.tempphone;
				}
			},
			remove:function(){				//删除联系人
				// console.log();
				if(confirm("确定删除吗?")){
					this.changephone = this.tempphone;
					this.$http.post("/inform/removeuser", {
						phone: this.changephone,
						sign: this.$route.params.sign
					}).then((data) => {
						if(data.body.result == "success"){
							alert("删除成功");
							this.show = false;
							this.disabled = true;
							this.btntext = "修改";
							this.$store.state.user_list.splice(this.idx, 1);
						}else{
							alert("删除失败");
						}
						console.log(data);
					}, (err) => {
						console.log(err);
						alert("发生错误");
					});
					// this.$store.state.user_list.splice(this.idx, 1);
				}
			},
			sub:function(){					//提交函数
			if(!this.wrong && this.changephone && this.changename && !this.special){
					console.log(this.changename);	
					console.log(this.changephone);
					console.log(this.idx);
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
								this.btntext = "修改";
								this.$store.state.user_list[this.idx].name = this.changename;
								this.$store.state.user_list[this.idx].phone = this.changephone;
								alert("修改成功");
								console.log(data);
							}else{
								this.show = false;
								this.disabled = true;
								this.btntext = "修改";
								alert("修改失败");
								console.log(data);
							}
						}, (err) => {
								console.log(err);
								this.show = false;
								this.disabled = true;
								this.btntext = "修改";
								alert("发生错误");
						});
						// this.$store.state.user_list[this.idx].name = this.changename;
						// this.$store.state.user_list[this.idx].phone = this.changephone;
						
					}
				}else{
					this.show = false;
					this.disabled = true;
					this.btntext = "修改";
					this.$emit('hide');
				}
			}else{
					alert("输入有误");
				}
				// }
			},
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
	ul{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column-reverse;
		background-color: white;
	}
	
	li{
		background-color: white;
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #F7F7F7;
		margin-left: 10px;
		margin-right: 10px;	
	}
	.search{
		margin: 10px;
		height: 20px;
		line-height: 20px;
		border: none;
		border-radius: 5px;
		outline: none;
		padding-left: 5px;
		text-align: center;
	}
	.group{
		width: 100%;
		background-color: white;
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #F7F7F7;
		padding-left: 10px;
		display: inline-block;
	}
	i.right{
		width: 10px;
		height: 10px;
		background-color: transparent;
		transform: rotate(45deg);
		float: right;
		border-top: 3px solid green;
		border-right: 3px solid green;
		margin-right: 25px;
		margin-top: 10px;
	}
	i.up{
		border-top: 3px solid green;
		border-right: 3px solid green;
	}
	i.bottom{
		border-top: 3px solid transparent;
		border-bottom: 3px solid green;
		border-right: 3px solid green;
	}
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
	.container input{
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