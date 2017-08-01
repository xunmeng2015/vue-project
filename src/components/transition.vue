<template>
		<div class="container" v-if="showlist">
			<div class="list">
				<p style="font-size:12px;height:20px;line-height:20px;margin-left: 10px;margin-top:5px;color:gray">分组</p>
				<ul>
					<li v-for="(group, index) in groups">{{ group.name }}<input type="radio" :value="index" v-model="groupc"></li>
				</ul>
				<p style="font-size:12px;height:20px;line-height:20px;margin-left: 10px;margin-top:5px;margin-bottom:5px;color:gray">联系人</p>
				<ul>
					<li v-for="(item, idx) in items">{{ item.name }}<input type="checkbox" :value="idx" v-model="userc"></li>
				</ul>
			</div>
		</div>
</template>

<script>
	export default{
		props:["showlist"],
			data(){
				return{
					groups: this.$store.state.group_list,
					items: this.$store.state.user_list,
					groupc:[],
					userc:[]
				}
			},
			methods:{
				sub:function(){
				var _this = this;
					console.log(_this.groupc);
					console.log(_this.userc);
				}
			}
	}
</script>

<style scoped>
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
	.list{
		width: 250px;
		height: 220px;
		background-color: white;
		overflow-y: scroll;
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
		float: right;
		margin-top: 12px;
	}
</style>