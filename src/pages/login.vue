<template>
	<div id="login" v-bind:style="login">
		<div v-bind:style="login" class="login_area">
			<div class="login_box">
				<div class="item">
					<p class="title">小信使</p>
				</div>
				<div class="item">
					<input type="number" id="phone" v-model="phone" placeholder="输入手机号码" />
				</div>
				<div class="item">
					<p class="warn" v-if="wrong">请输入正确的手机号码</p>
				</div>
				<div class="item" v-if="logintype">
					<p><input type="number" id="code" v-model="code" v-bind:style="codeinput" placeholder="输入验证码"  /><button v-text="code_tip" v-on:click="getCode" :disabled="dis" id="get_code"></button></p>
				</div>
				<div class="item" v-else>
					<input type="password" id="pass" v-model="pass" placeholder="输入登录密码" />
				</div>
				<div class="item">
					<button id="sub" v-on:click="sub">登 录</button>
				</div>
			</div>
			<h1 class="type" @click="change" v-text="type_tip"></h1>
		</div>
	</div>
	</div>
</template>
<!--
	phone表示手机号码
	dis表示是否可操作
	wrong提示格式错误
	code_tip代表按钮内容
 -->
<script>
import md5 from '../assets/js/login.js'
export default{
	data (){
		return {
			phone: "",
			wrong: false,
			code_tip: "获取验证码",
			login:{
				height: window.innerHeight + "px"
			},
			codeinput:{
				width: window.innerWidth * 0.8 * 0.6 - 2 + "px"
			},
			dis: false,
			code: "",
			pass: "",
			logintype: true,
			type_tip: "用密码登录  >>",
		}
	},
	beforeCreate: function(){
		document.title = "小信使 登录";
	},
	mounted: function(){
		var _this = this;
				if(localStorage.getItem("codetime") != null){
				var sub = 60 - (Math.floor(new Date().getTime() / 1000) - localStorage.getItem("codetime"));
				if(sub > 0){
					this.dis = true;
					var a = setInterval(function(){
						_this.code_tip = sub + "s重新获取";
						sub--;
						if(sub < 0){
							clearInterval(a);
							this.dis = false;
							_this.code_tip = "获取验证码";
						}
					}, 1000);
				}
			}
		},
	watch:{
		phone: function(){
			if(this.phone.length > 11){
				this.phone = this.phone.substr(0, 11);
			}
			if(!/^1\d{10}$/g.test(this.phone)){
				this.wrong = true;
			}else{
				this.wrong = false;
			}
		},
		code: function(){
			if(this.code.length > 8){
				this.code = this.code.substr(0, 8);
			}
		},
		pass: function(){
			if(this.pass.length > 20){
				this.pass = this.pass.substr(0, 20);
			}
		}
	},
	methods: {
		change: function(){
			this.logintype = !this.logintype;
			if(this.logintype){
				this.type_tip = '用密码登录 >>';
			}else{
				this.type_tip = '验证码登录 >>'
			}
		},
		getCode: function(){
			var _this = this;
			var s = 60;
			if(!_this.wrong && _this.phone){
				this.$http.post('/inform/getCode',{phone:this.phone}, {timeout:10000}).then((data) => {
				}, (err) => {
					alert("发生错误!");
					s=0;
				});
				_this.dis = true;
				localStorage.setItem("codetime", Math.floor(new Date().getTime() / 1000));
				var a = setInterval(function(){
					_this.code_tip = s + "s重新获取";
					s--;
					if(s < 0){
						clearInterval(a);
						_this.dis = false;
						_this.code_tip = "获取验证码";
					}
				}, 1000);
			}else{
				alert("号码有误，请重新输入");
			}
		},
		sub: function(){
			if(!this.wrong && /^\d{6}$/.test(this.code) && this.phone || !this.logintype && this.pass && this.phone){
				this.$http.post('/inform/login', {
						phone: this.phone, 
						// code:this.code,
						code: this.logintype ? this.code : md5(this.pass),
						logintype: this.logintype ? 'code' : 'pass'
					}, {timeout: 10000}).then((data) => {
					var sign = data.body.sign;
					if(sign == "no"){
						this.logintype ? alert("验证码不对！") : alert("密码不对");
					}else{
						this.$store.commit('savesign', data.body.sign);
						this.$store.commit('setinform', data.body.history);
						console.log(data.body.history);
						sessionStorage.setItem("history", JSON.stringify(data.body.history));
						this.$router.push({name:'first', params:{sign:data.body.sign}});
					}
				}, (err) => {
					console.log(err);
					alert("登录超时，请重试！")
				});
			}else{
				alert("信息输入有误！");
			}
		}
	}
}
</script>

<style lang="css" scoped>
	#login{
		background: url('../assets/img/44.png');
		background-size: 110% 100%;
	}
	.login_area{
		display: -webkit-box; 
	    display: -ms-flexbox; 
	    display: -webkit-flex; 
	    display: flex; 
		/*-webkit-box-align: center;
	    -moz-align-items: center;
	    -webkit-align-items: center;
	    align-items: center;*/
		-webkit-box-pack: center;
	    -moz-justify-content: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	.title{
		color: white;
		font-size: 25px;
		padding-bottom: 10px;
		font-family: "仿宋";
	}
	.item{		/*flex单元*/
		margin-bottom: 10px;
		text-align: center;
	}
	input{		/*输入框*/
		height: 37px;
		margin: 0px;
		padding: 0px;
		border: 1px solid white;
		border-right-color: #E5E5E5;
		border-radius: 0;
	}
	#code{		/*验证码输入框*/
		outline: none;
		width:100px;
		/*padding-left: 5px;*/
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		font-size: 15px;
		border-top-width: 0px;
		border-bottom-width: 0px;
		width: 50%;
		text-indent: 5px;
	}
	#phone, #pass{		/*手机号码输入框*/
		width: 100%;
		outline: none;
		border-radius: 5px;
		font-size: 15px;
		text-indent: 5px;
		border:none;
	}
	#get_code{	/*获取验证码按钮*/
		width: 40%;
		height: 37px;
		border: none;
		color: black;
		background-color: white;
		float: right;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		font-size: 13px;
	}
	.warn{		/*格式警告*/
		width: 100%;
		text-align: right;
		color: white;
		font-weight: bold;
	}
	#sub{		/*提交按钮*/
		height: 37px;
		width: 205px;
		border: none;
		width: 100%;
		border: 1px solid #E0E0E0;
		border-radius: 5px;
		color: white;
		font-size: 15px;
		background-color: rgba(30, 130, 100, 0.3);
	}
	.login_box{
		width: 80%;
		height: 180px;
		/*padding-bottom: 30px;*/
		margin-top: 80px;
	}
	.type{
		color: black;
		font-size: 14px;
		position: fixed;
		bottom:0;
		left: 50%;
		margin-left: -50px;
		margin-bottom: 80px;
		text-align: left;
		width: 110px;
		/*text-align: center;*/
		color: white;
		/*width: 1000px;*/
	}
</style>