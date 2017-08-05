<template>
	<div>
		<div class="container">
		<input type="text" v-bind:style="input" v-on:focus="focus" v-on:blur="blur" placeholder="搜索记录" />
		<router-link :to="{name: 'about', params:{sign: this.$route.params.sign }}"><div class="box">
			<i class="right"></i>
			<p class="title">欢迎使用小信使</p>
			<p class="content">点击查看详情</p>
		</div></router-link>
		<p style="font-size:12px;height:20px;line-height:20px;margin-left: 10px;margin-top:5px;margin-bottom:5px;color:gray">历史通知</p>
		<ul>
				<router-link :to="{name: 'inform', params:{sign: this.$route.params.sign }}"><li><!-- <span>***</span> -->新建通知<i class="right"></i></li></router-link>
			</ul>
			<br>
		<div class="box" v-for="(item, index) in items">
			<p class="title">{{item.title}}</p>
			<p class="content">活动时间{{item.acttime}}</p>
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
				},
				items: (this.$store.state.history.length > 0) ? this.$store.state.history : JSON.parse(sessionStorage.getItem('history')),
			}
		},
		components: {
			foot
		},
		beforeCreate: function(){
			document.title = "小信使";
		},
		mounted: function(){
			if(this.$store.state.history.length == 0){
				this.$store.commit('setinform', !sessionStorage.getItem('history') > 0 ? [] : JSON.parse(sessionStorage.getItem('history')));
			}
			if(this.$store.state.user_list.length == 0 && !sessionStorage.getItem('user_list')){
				this.$http.post('/inform/getuserinform', {
					sign: this.$route.params.sign
				}).then((data) => {
					console.log(data);
					this.$store.commit('setuser', data.body.friend);
					this.$store.commit('setgroup', data.body.group);
					sessionStorage.setItem("user_list", JSON.stringify(data.body.friend));
					sessionStorage.setItem("group_list", JSON.stringify(data.body.group));
				}, (err) => {
					console.log(err);
					alert("获取用户信息失败");
				});
				console.log("获取用户信息完毕");
			}
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
		border-bottom: 1px solid #F7F7F7;
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
		font-size: 13px;
	}
	.history{
		border-bottom: 1px solid #F7F7F7;
	}
</style>