<template>
	<div id="login" v-bind:style="login">
		<div v-bind:style="login" class="login_area">
			<div class="login_box">
				<div class="item">
					<p class="area">+86</p><input type="text" id="phone" v-model="phone" placeholder="无需注册即可使用" />
				</div>
				<div class="item">
					<p class="warn" v-if="wrong">请输入正确的手机号码</p>
				</div>
				<div class="item">
					<input type="text" id="code" v-model="code" /><button v-text="code_tip" v-on:click="getCode" :disabled="dis" id="get_code"></button>
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
	watch: {
		phone: function(){
			if(!/^1\d{10}$/g.test(this.phone)){
				this.wrong = true;
			}else{
				this.wrong = false;
			}
		}
	},
	beforeCreate: function(){
		document.title = "及事通 登录"
	},
	watch:{
		phone: function(){
			if(this.phone.length > 11){
				this.phone = this.phone.substr(0, 11);
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
			_this.dis = true;
			var s = 60;
			var a = setInterval(function(){
				_this.code_tip = "重新获取(" + s + ")";
				s--;
				if(s < 0){
					clearInterval(a);
					_this.dis = false;
					_this.code_tip = "获取验证码";
				}
			}, 1000);
		},
		sub: function(){
			var _this = this;
			if(!_this.right && /^\d{6}$/.test(_this.code) && _this.phone){
				// alert("登录成功");
				window.location.href = '/#/first';
			}else{
				alert("输入有误，请重新输入");
			}
		}
	}
}
</script>

<style lang="css" scoped>
	#login{
		background: url('../assets/img/1.jpg');
		background-size: 110% 100%;
	}
	.login_area{
		background-color: rgba(255, 255, 255, 0.7);
		display: flex;
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
	}
	.item{		/*flex单元*/
		margin-bottom: 15px;
		width: 200px;
	}
	.area{		/*区号*/
		background: #EAEAEA;
		height: 32px;
		border: 1px solid #E0E0E0;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		width: 35px;
		float: left;
		line-height: 32px;
	}
	input{		/*输入框*/
		height: 30px;
		border: 1px solid #E0E0E0;
	}
	#code{		/*验证码输入框*/
		/*border-left: none;*/
		border-bottom-left-radius: 10px;
		border-top-left-radius: 10px;
		outline: none;
		width:100px;
	}
	#phone{		/*手机号码输入框*/
		/*border-right: none;*/
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		width: 158px;
		outline: none;
	}
	#get_code{	/*获取验证码按钮*/
		/*border-left-style: none;*/
		 width:95px;
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
		width: 200px;
		border-radius: 10px;
		border: none;
		background-color: #EAEAEA;
	}
	#sub:hover{
		background-color: white;
	}
</style>