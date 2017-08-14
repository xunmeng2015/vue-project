<template>
	<div id="login" v-bind:style="login">
		<div v-bind:style="login" class="login_area">
			<div class="login_box">
				<div class="item">
					<input type="number" id="phone" v-model="phone" placeholder="请输入手机号码" />
				</div>
				<div class="item">
					<p class="warn" v-if="wrong">请输入正确的手机号码</p>
				</div>
				<div class="item">
					<input type="number" id="code" v-model="code" /><button v-text="code_tip" v-on:click="getCode" :disabled="dis" id="get_code"></button>
				</div>
				<div class="item">
					<button id="sub" v-on:click="sub">登录</button>
				</div>
			</div>
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
export default{
	data (){
		return {
			phone: "",
			wrong: false,
			code_tip: "获取验证码",
			login:{
				height: window.innerHeight + "px"
			},
			dis: false,
			code: ""
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
		}
	},
	methods: {
		getCode: function(){
			var _this = this;
			if(!_this.wrong && _this.phone){
				this.$http.post('/inform/getCode',{phone:this.phone}, {timeout:10000}).then((data) => {
				}, (err) => {
					alert("发生错误!");
				});
				_this.dis = true;
				localStorage.setItem("codetime", Math.floor(new Date().getTime() / 1000));
				var s = 60;
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
			if(!this.wrong && /^\d{6}$/.test(this.code) && this.phone){
				this.$http.post('/inform/login', {phone: this.phone, code:this.code}, {timeout: 10000}).then((data) => {
					var sign = data.body.sign;
					if(sign == "no"){
						alert("验证码不对！");
					}else{
						this.$store.commit('savesign', data.body.sign);
						this.$store.commit('setinform', data.body.history);
						console.log(data.body.history);
						sessionStorage.setItem("history", JSON.stringify(data.body.history));
						this.$router.push({name:'first', params:{sign:data.body.sign}});
					}
				}, (err) => {
					console.log(err);
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
		background: url('../assets/img/11.jpg');
		background-size: 110% 100%;
	}
	.login_area{
		background-color: rgba(255, 255, 255, 0.7);
		display: -webkit-box; 
	    display: -ms-flexbox; 
	    display: -webkit-flex; 
	    display: flex; 
		-webkit-box-align: center;
	    -moz-align-items: center;
	    -webkit-align-items: center;
	    align-items: center;
		-webkit-box-pack: center;
	    -moz-justify-content: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	.item{		/*flex单元*/
		margin-bottom: 15px;
		width: 210px;
		text-align: center;
	}
	input{		/*输入框*/
		height: 30px;
		border: 1px solid #E0E0E0;
	}
	#code{		/*验证码输入框*/
		border-bottom-left-radius: 10px;
		border-top-left-radius: 10px;
		outline: none;
		width:100px;
		padding-left: 5px;
	}
	#phone{		/*手机号码输入框*/
		border-radius: 10px;
		width: 197px;
		outline: none;
		padding-left: 5px;
	}
	#get_code{	/*获取验证码按钮*/
		 width:97px;
		 height: 34px;
		 border-top-right-radius: 10px;
		 border-bottom-right-radius: 10px;
		 border: none;
		 background-color: #EAEAEA;
	}
	.warn{		/*格式警告*/
		width: 200px;
		text-align: center;
		color: red;
	}
	#sub{		/*提交按钮*/
		height: 34px;
		width: 205px;
		border-radius: 10px;
		border: none;
		background-color: #EAEAEA;
		border: 1px solid #E0E0E0;
	}
	#sub:hover{
		background-color: white;
	}
</style>