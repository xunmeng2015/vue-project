<template>
	<div class="list">
	<!-- <top></top> -->
	<input type="text" v-bind:style="input" v-on:focus="focus" v-on:blur="blur" placeholder="搜索号码或名字" />
	<router-link to='/adduser'><span class="group">添加联系人<i class="right"></i></span></router-link><br>
	<router-link to='/addgroup'><span class="group">添加分组<i class="right"></i></span></router-link><br><br>
	<span class="group" v-on:click="fanzhuan">分组<i v-bind:class="['right', {'up': up},{'bottom': !up}]"></i></span><br>
		<ul v-if="seen">
				<li v-for="group in groups">{{group.name}}</li>
		</ul>
		<p style="font-size:15px;height:20px;line-height:20px;margin-left: 10px;margin-top:5px;margin-bottom:5px;color:gray">联系人</p>
		<ul>
			<li v-for="item in items">{{item.name}}</li>
		</ul>
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
				items:[{
					name:"华华",
					phone:"18826103503"
				},
				{
					name:"华华",
					phone:"18826103503"
				}],
				input: {
					width: window.innerWidth - 25 + "px",
				},
				up: true,
				seen: false,
				groups:this.$store.state.group_list
			}
		},
		components: {
			foot,
			top
		},
		beforeCreate: function(){
			document.title = "及事通"
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
			}

		}
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
</style>