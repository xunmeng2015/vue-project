<template>
<center>
	<button v-on:click="start">开始</button>
	<br>
	<button v-on:click="stop">结束</button>
	</center>
</template>


<script>
	export default{
		data(){
			return {

			}
		},
		methods:{
			start: function(){
				this.$http.get('/inform/statrlisten').then((data) => {
					console.log(data)
				}, (err) => {
					alert("发生错误");
					console.log(err);
				})
			},
			stop: function(){
				this.$http.get('/inform/stoplisten').then((data) => {
					console.log(data)
				}, (err) => {
					alert("发生错误");
					console.log(err);
				})
			}
		}
	}
</script>

<style>
	
</style>