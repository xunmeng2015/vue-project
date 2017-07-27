<template>
	<div class="top">
		<div v-on:click="back">
			<!-- <label class="back"></label><span>返回</span> -->
			<label class="add">+</label>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			back: function(){
				history.back();
			}
		}
	}
</script>

<style scoped>
	.top{
		width: 100%;
		height: 40px;
		background-color: white;
	}
	.back{
		display: inline-block;
		width: 10px;
		height: 10px;
		background-color: transparent;
		transform: rotate(45deg);
		border-bottom: 3px solid green;
		border-left: 3px solid green;
		margin-top: 12.5px;
		margin-left: 10px;
	}
	.add{
		float: right;
		margin-right: 10px;
		margin-top: 5px;
		font-size: 30px;
	}
</style>