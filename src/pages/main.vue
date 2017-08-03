<template>
	<div>
		<div class="container">
		<input type="text" v-bind:style="input" v-on:focus="focus" v-on:blur="blur" placeholder="搜索记录" />
		<div class="box">
			<i class="right"></i>
			<p class="title">欢迎使用小信使</p>
			<p class="content">点击了解详情</p>
		</div>
		<p style="font-size:12px;height:20px;line-height:20px;margin-left: 10px;margin-top:5px;margin-bottom:5px;color:gray">历史通知</p>
		<ul>
				<router-link :to="{name: 'inform', params:{sign: this.$route.params.sign }}"><li><!-- <span>***</span> -->新建通知<i class="right"></i></li></router-link>
			</ul>
			<br>
		<div class="box history">
			<p class="title">欢迎使用小信使</p>
			<p class="content">点击了解详情</p>
		</div>
		<div class="box">
			<p class="title">欢迎使用小信使</p>
			<p class="content">点击了解详情</p>
		</div>
		</div>
		<keep-alive>
			<foot></foot>
		</keep-alive>
	</div>
</template>

<script>
	import foot from "../components/foot"
	export default{
		data(){
			return{
				input: {
					width: window.innerWidth - 25 + "px",
				}
			}
		},
		components: {
			foot
		},
		beforeCreate: function(){
			document.title = "小信使";
			
		},
		methods:{
			focus: function(){
				var _this = this;
				_this.input = {
					width: window.innerWidth - 25 + "px",
					textAlign: "left"
				}
			},
			blur: function(){
				var _this = this;
				_this.input = {
					width: window.innerWidth - 25 + "px",
					textAlign: "center"
				}
				// console.log(this.$router.params.sign);
			},
			fanzhuan:function(){
				var _this = this;
				_this.up = !_this.up;
				_this.seen = !_this.seen;
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
	}
	li{
		background-color: white;
		height: 50px;
		line-height: 50px;
		padding-left: 10px;
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
		margin-top: 18px;
	}
	li:active{
	  background-color: #FCFCFC;
	}
	input{
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
		/*height: 35px;
		line-height: 35px;*/
		padding-left: 10px;
		display: inline-block;
	}
	.box{
		height: 50px;
		background-color: white;
		padding-left: 10px;
	}
	.title{
		height: 20px;
		/*margin-top: 10px;*/
		padding-top: 10px;
		/*line-height: 40px;*/
	}
	.content{
		height: 20px;
		padding-bottom: 10px;
		color: gray;
		font-size: 12px;
	}
	.history{
		border-bottom: 1px solid #F7F7F7;
	}
</style>