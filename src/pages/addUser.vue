<template>
	<div class="container">
		<div class="box">
			<p class="title">昵称<span class="necessary">*</span><span v-if="special" class="wrong">   昵称不能包含<>.*+-/"'</span></p>
			<input type="text" id="name" v-model="name">
			<p class="title">联系方式<span class="necessary">*</span><span v-if="wrong" class="wrong">格式出错!!</span></p>
			<input type="number" id="name" v-model="phone">
			<button class="add_btn" v-on:click="add">添加</button>
		</div>
		<foot></foot>
	</div>
</template>

<script>
import foot from '../components/foot'
	export default{
		data(){
			return {
				name:"",
				phone:"",
				wrong:false,
				special:false
			}
		},
		beforeCreate: function(){
			document.title = "新建联系人"
		},
		components: {
			foot
		},
		watch:{
			phone:function(){
				if(!/1\d{10}/.test(this.phone)){
					this.wrong = true;
				}else{
					this.wrong = false;
				}
				if(this.phone.length > 11){
					this.phone = this.phone.substr(0, 11);
				}
			},
			name:function(){
				if(/[<>.*+-/"']/g.test(this.name)){
					// this.name = this.name.length > 15 ? this.name.substr(0, 15) : this.name.substr(0, this.name.length - 1);
					this.special = true;
				}else{
					this.special = false;
				}
				if(this.name.length > 15){
					this.name = this.name.substr(0, 15);
				}
			}
		},
		methods:{
			add: function(){			//添加好友
				// var _this = this;
				if(!this.wrong && this.name && this.phone && !this.special){
					if(confirm("确定添加吗")){
						console.log(this.name + " " + this.phone);
						this.$http.post('/inform/adduser', 
							{sign:this.$route.params.sign,
							 name:this.name,
							 phone:this.phone},
							{timeout:10000}).then((data) => {
								console.log(data);
								var statu = data.body.result;
								if(statu == "repeat"){
									alert("该号码已存在!");
								}else{
									alert("添加成功");
									this.$router.push({name:'group', params:{sign:this.$route.params.sign}});
									var uu = JSON.parse(sessionStorage.getItem("user_list")).concat({
									name:this.name,
									phone:this.phone
								});
								sessionStorage.setItem("user_list", JSON.stringify(uu));
								this.$store.commit('adduser', {
									name:this.name,
									phone:this.phone
								});
								this.$router.push({name:'group', params:{sign:this.$route.params.sign}});
								}
							})
					}else{return;}
				}
				else{
					alert("输入信息不符合要求！");
				}
			}
		}
	}
</script>

<style scoped>
	.box{
		height: auto;
		background-color: white;
		padding: 10px;
		border-radius: 5px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
		box-shadow: 0px 0px 10px 1px lightgray;
	}
	.title{
		font-size: 15px;
		color: green;
		margin-bottom: 3px;
	}
	.box input{
		border: none;
		border-bottom: 1px solid black;
		width: 99%;
		outline: none;
		margin-bottom: 10px;
	}
	.add_btn{
		width: 100%;
		height: 30px;
		font-size: 16px;
	}
	.necessary{
		color: red;
		font-size: 18px;
	}
	.wrong, .special{
		color: red;
		font-size: 13px;
	}
</style>