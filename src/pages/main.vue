<template>
	<div>
		<div class="container" v-bind:style="con" @click="back($event)">
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
		<div class="box inform_box" v-for="(item, index) in items" v-bind:style="box">
			<div class="area" v-bind:style="area" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event, index)">
				<p class="title">{{item.title}}</p>
				<p class="content">活动时间{{item.acttime}}</p>
			</div>
				<span class="remove">删除</span>
		</div>
		</div>
		<keep-alive>
			<foot></foot>
		</keep-alive>
	</div>
</template>

<script>
	import foot from "../components/foot"
	import Vue from 'vue'
	Vue.directive('touch', {
		inserted:function(el){
			el.focus();
		}
	})
	export default{
		data(){
			return{
				start_x: "",
				temp_x: "",
				sub_x: "",
				idx: -1,
				con:{
					height: window.innerHeight + 'px'
				},
				input: {
					width: window.innerWidth - 25 + "px",
				},
				box: {
					width: window.innerWidth + 51 + "px",
				},
				area: {
					width: window.innerWidth + "px",
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
				this.$store.commit('setinform', !sessionStorage.getItem('history') ? [] : JSON.parse(sessionStorage.getItem('history')));
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
			start: function(event){
				event.stopPropagation();
				if(this.idx < 0){
				}else{
					document.getElementsByClassName('inform_box')[this.idx].style.right = "0px";
					document.getElementsByClassName('inform_box')[this.idx].style.transition = "right 0.5s";
					this.idx =  -1;
				}
				this.start_x = event.touches[0].pageX;
			},
			move: function(event){
				event.stopPropagation();
				this.temp_x = event.touches[0].pageX;
				this.sub_x = this.start_x - this.temp_x;
				if(this.sub_x < 0){
					event.target.parentNode.style.right = "0px";
				}else if(0 < this.sub_x && this.sub_x < 60){
					event.target.parentNode.parentNode.style.right = this.sub_x + "px";
				}else{
					event.target.parentNode.parentNode.style.right = "60px";
				}
			},
			end: function(event, index){
				event.stopPropagation();
				if(this.sub_x > 35){
					event.target.parentNode.parentNode.style.right = "60px";
					this.idx = index;
				}else{
					event.target.parentNode.parentNode.style.right = "0px";
				}
				this.sub_x = 0;
			},
			back: function(event){
				event.stopPropagation();
				if(this.idx < 0){
				}else{
					document.getElementsByClassName('inform_box')[this.idx].style.right = "0px";
					document.getElementsByClassName('inform_box')[this.idx].style.transition = "right 0.5s";
					this.idx = -1;
				}
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
		padding-left: 10px;
		display: inline-block;
	}
	.box{
		height: 50px;
		background-color: white;
		padding-left: 10px;
		border-bottom: 1px solid #F7F7F7;
		position: relative;
		-webkit-backface-visibility: hidden;
		/*right: 60px;*/
	}
	.title{
		height: 20px;
		padding-top: 10px;
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
	.area{
		/*display: inline-block;*/
		float: left;
		position: relative;
		width: 320px;
		-webkit-backface-visibility: hidden;
	}
	.remove{
		width: 50px;
		height: 50px;
		display: inline-block;
		background-color: red;
		text-align: center;
		line-height: 50px;
		float: right;
		-webkit-appearance : normal ;
		color: white;
	}
</style>