<template>
	<div class="container">
	<br>
		<div class="page">
		<ul>
				<router-link :to="{name: 'inform', params:{sign: this.$route.params.sign }}"><li>新建通知<i class="right"></i></li></router-link>
				<li>查看记录<i class="right"></i></li>
				<router-link to='/adduser'><li>添加好友<i class="right"></i></li></router-link>
				<router-link to='/addgroup'><li>新建分组<i class="right"></i></li></router-link>
				<li v-on:click="logout">退出系统</li>
			</ul>
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
			document.title = "小信使"
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
			},
			fanzhuan:function(){
				var _this = this;
				_this.up = !_this.up;
				_this.seen = !_this.seen;
			},
			logout: function(){
				localStorage.removeItem("logintime");
				this.$router.push({name: 'login'});
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
		justify-content: space-around;
	}
	li{
		background-color: white;
		height: 40px;
		line-height: 40px;
		margin-bottom: 10px;
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
		margin-top: 15px;
	}
	li:active{
	  background-color: #FCFCFC;
	}
</style>