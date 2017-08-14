<template>
	<div class="container">
	<br>
		<div class="page">
		<ul>
				<router-link :to="{name: 'inform', params:{sign: this.$route.params.sign }}"><li>新建通知<i class="right"></i></li></router-link>
				<br>
				<router-link :to="{name:'adduser', params:{sign: this.$route.params.sign}}"><li>添加联系人<i class="right"></i></li></router-link>
				<router-link :to="{name:'addgroup', params:{sign: this.$route.params.sign}}"><li>添加分组<i class="right"></i></li></router-link>
				<br>
				<li>设置登录密码<i class="right"></i></li><br>
				<li>更多功能</li>
				<li>敬请期待</li><br>
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
				sessionStorage.clear();
				this.$router.push({name:'login'});
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
</style>