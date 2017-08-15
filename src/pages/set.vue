<template>
	<div>
	<br>
		<div class="page">
		<ul>
				<router-link :to="{name: 'inform', params:{sign: this.$route.params.sign }}"><li>新建通知<i class="right"></i></li></router-link>
				<br>
				<router-link :to="{name:'adduser', params:{sign: this.$route.params.sign}}"><li>添加联系人<i class="right"></i></li></router-link>
				<router-link :to="{name:'addgroup', params:{sign: this.$route.params.sign}}"><li>添加分组<i class="right"></i></li></router-link>
				<br>
				<li @click="setpassword">设置登录密码<i class="right"></i></li><br>
				<li>更多功能</li>
				<li>敬请期待</li><br>
				<li v-on:click="logout">退出系统</li>
			</ul>
		</div>
		<div class="container" v-if="show" @click="hide">
			<div class="area" @click="prevent($event)">
			<h1>设置密码</h1>
				<input type="password" placeholder="输入密码" v-model="pass">
				<input type="password" name="" placeholder="再次输入密码" v-model="repeat">
				<p class="warn" v-if="wrong" v-text="warn"></p>
				<button @click="sub">提交</button>
			</div>
		</div>
		<keep-alive>
			<foot></foot>
		</keep-alive>
	</div>
</template>

<script>
	import foot from "../components/foot"
	import md5 from '../assets/js/login.js'
	export default{
		data(){
			return{
				input: {
					width: window.innerWidth - 25 + "px",
				},
				show: false,
				wrong: false,
				pass: "",
				repeat: "",
				warn: ""
			}
		},
		components: {
			foot
		},
		watch:{
			pass: function(){
				if(this.pass.length < 6){
					this.wrong = true;
					this.warn = "密码长度必须大于6噢"
				}
				else if(this.pass.length > 20){
					this.wrong = true;
					this.warn = "密码最多只能输入20位噢";
					this.pass = this.pass.substr(0, 20);
				}
				else{
					this.wrong = false;
				}
			},
			repeat: function(){
				if(this.pass != this.repeat){
					this.wrong = true;
					this.warn = "两次输入的密码不一致!";
				}else{
					this.wrong = false;
				}
				if(this.repeat.length > 20){
					this.repeat = this.repeat.substr(0, 20);
				}
			}
		},
		beforeCreate: function(){
			document.title = "小信使"
		},
		methods:{
			setpassword: function(){
				this.show = true;
			},
			hide: function(){
				this.show = false;
			},
			sub: function(){
				if(this.pass.length < 6){
					this.wrong = true;
					this.warn = "密码长度必须大于6噢"
				}else{
					if(!this.wrong && this.pass && this.repeat){
						console.log(md5(this.pass) + "  " + md5(this.repeat));
						this.$http.post('/inform/setpassword', {
							sign: this.$route.params.sign,
							password: md5(this.pass)
						}).then(data => {
							if(data.body.result == "success"){
								alert("密码设置成功!");
								this.show = false;
							}else{
								alert("发生错误，请重试!");
							}
						}, err =>{
							alert("发生错误，请重试!");
						});
					}else{
						alert("输入有误，请重新输入!");
					}
				}
			},
			logout: function(){
				sessionStorage.clear();
				this.$router.push({name:'login'});
			},
			prevent: function(e){
				e.stopPropagation();
			}
		}
	}
</script>

<style scoped>
	ul{
		width: 100%;
		display: flex;
		flex-direction: column;
		height: auto;
		/*justify-content: space-around;*/
	}
	li{
		background-color: white;
		height: 40px;
		line-height: 40px;
		/*margin-bottom: 10px;*/
		padding-left: 10px;
		border-bottom: 1px solid #F7F7F7;
	}
	i.right{
		display: inline-block;
		width: 10px;
		height: 10px;
		background-color: transparent;
		transform: rotate(45deg);
		border-top: 3px solid green;
		border-right: 3px solid green;
		float: right;
		margin-right: 20px;
		margin-top: 15px;
	}
	li:active{
	  background-color: #FCFCFC;
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
	.area{
		width: 80%;
		height: 120px;
		background-color: white;
		height: auto;
		padding: 10px;
		border-radius: 5px;
		box-shadow: 0px 0px 10px 1px white;
	}
	input{
		width: 100%;
		margin-bottom: 10px;
		border-radius: 0px;
		padding: 0px;
		height: 25px;
		border: 1px solid lightgray;
		text-indent: 2px;
		font-size: 14px;
	}
	h1{
		text-align: center;
		margin-bottom: 10px;
	}
	button{
		-webkit-appearance:none;
		width: 100%;
		height: 25px;
		background-color: #F1F1F1;
		border:1px solid #F5F5F5;
		box-shadow: 0px 0px 10px 1px lightgray;
	}
	.warn{		/*格式警告*/
		width: 100%;
		text-align: right;
		color: red;
		margin-bottom: 5px;
		margin-top:-5px;
	}
</style>