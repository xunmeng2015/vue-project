<template>
		<div class="container" v-if="showlist" v-on:click="hide">
			<div class="list" v-on:click="prevent($event)">
			<div v-if="showgroup">
				<p style="font-size:12px;height:20px;line-height:20px;margin-left: 10px;margin-top:5px;color:gray">分组(只能选一个，重选覆盖)</p>
				<ul>
					<li v-for="(group, index) in groups">{{ group.name }}<input type="radio" :value="group" v-model="groupc" :checked="checked" ></li>
				</ul>
			</div>
				<p style="font-size:12px;height:20px;line-height:20px;margin-left: 10px;margin-top:5px;margin-bottom:5px;color:gray">联系人</p>
				<ul>
					<li v-for="(item, idx) in items">{{ item.name }}<input type="checkbox" :value="item" v-model="userc"></li>
				</ul>
			</div>
			<button style="width:250px;background-color:white;border:solid 1px white;margin-top:3px;" v-on:click="sub">确定</button>
		</div>
</template>

<script>
	export default{
		props:["showlist", "showgroup", "checked"],
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
					console.log(this.groupc);
					// console.log(this.userc);
					this.$emit("concat", this.userc, this.groupc);
				},
				hide: function(){
					this.$emit('hide');		//调用父组件的事件
				},
				prevent: function(e){
					e.stopPropagation();		//阻止冒泡
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