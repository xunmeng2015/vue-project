<template>
	<div class="container">
		<div class="box">
			<p class="title">分组名称<span class="necessary">*</span><span v-if="special" class="wrong">   昵称不能包含<>.*+-/"'!</span></p>
			<input type="text" id="name" v-model="name">
				<p class="title">添加对象<span v-if="wrong" class="wrong">格式出错!!</span></p>
				<input type="number" id="time" v-model="addPhone" placeholder="请输入手机号码"> <!--</textarea>type="text" id="time" v-model="addPhone" placeholder="请输入手机号码"> -->
				<span class="list" v-on:click="chooselist">从通讯录选择</span>
				<button class="add_btn" v-on:click="add">添加</button>
		</div>
		<div class="userList" v-if="show">
				<ul>
					<li v-for="(item, index) in items"><span class="name">{{item.name}}</span>{{item.phone}}<span v-on:click="remove(index)" class="remove">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span></li>
				</ul>
		</div>
		<br style="clear:both">
		<keep-alive>
			<chooselist :showlist="showlist" v-on:hide="hide" v-on:concat="fromlist"></chooselist>
		</keep-alive>
		<button v-on:click="sub" class="sub-btn">提交</button><br>
		<keep-alive>
			<foot></foot>
		</keep-alive>
	</div>
</template>

<script>
import foot from '../components/foot'
import chooselist from '../components/chooselist'
	export default{
		data(){
			return {
				name:"",
				addPhone:"",
				items:[],
				show:false,
				special:false,
				wrong: false,
				showlist: false,
				isHave: {}
			}
		},
		beforeCreate: function(){
			document.title = "新建分组"
		},
		components: {
			foot,
			chooselist
		},
		watch:{
			addPhone:function(){
				if(this.addPhone.length > 11){
					this.addPhone = this.addPhone.substr(0, 11);
				}
				if(!/1\d{10}/.test(this.addPhone)){
					this.wrong = true;
				}else{
					this.wrong = false;
				}
			},
			name:function(){
				if(this.name.length > 15){
					this.name = this.name.substr(0, 15);
				}
				if(/[<>.*+-/"'!]/g.test(this.name)){
					// this.name = this.name.length > 15 ? this.name.substr(0, 15) : this.name.substr(0, this.name.length - 1);;
					this.special = true;
				}else{
					this.special = false;
				}
			}
		},
		methods:{
			add: function(){
				// var _this = this;
				if(!/^1\d{10}$/.test(this.addPhone)){
					alert("请输入正确的号码");
				}else{
					this.items.push({name: this.addPhone,
									 phone: this.addPhone});
					this.show = true;
				}
				this.addPhone = "";
				this.wrong = false;
				// console.log(this.items);
			},
			remove: function(idx){
				// var _this = this;
				this.items.splice(idx, 1);
				if(this.items.length == 0){
					this.show = false;
				}
			},
			sub: function(){
				// var _this = this;
				if(!this.special && this.name){
				// 	this.items.map(function(item, index){
				// 	console.log(item["name"] + " " + item["phone"]);
				// });
				this.$http.post('/inform/addgroup', {
					name: this.name,
					sign: this.$route.params.sign,
					member: this.items
				}).then((data) => {
					if(data.body.result == "no"){
						alert("添加失败");
					}else{
						alert("添加成功");
						this.$store.commit('addgroup', {
							name: this.name,
							groupsign: data.body.result			//分组标志
						});
						this.$set(this.$store.state.group_infor, data.body.result, this.items);
						var gg = JSON.parse(sessionStorage.getItem("group_list")).concat({
							name: this.name,
							groupsign: data.body.result			//分组标志
						});
						sessionStorage.setItem("group_list", JSON.stringify(gg));
						this.$router.push({name:'group', params:{sign:this.$route.params.sign}});
						// console.log(this.$store.state.group_infor[data.body.result]);
					}
					// console.log(data);
				}, (err) => {
					// console.log(err);
				});
			}else{
				alert("输入有误!");
				// this.$store.state.group_list.push({this.name});
			}
			},
			hide: function(){
				// var _this = this;
				this.showlist = false;
			},
			chooselist: function(){
				// var _this = this;
				this.showlist = true;
			},
			fromlist: function(userc){
				if(userc.length > 0){
					this.show = true;
					this.items = this.items.concat(userc);
				}
				console.log(this.items);
			}
		}
	}
</script>

<style scoped>
.container{
	width:100%;
}
	.box{
		height: auto;
		background-color: white;
		padding: 10px;
		border-radius: 5px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
		box-shadow: 0px 0px 10px 1px lightgray;
		z-index: 2;
		position: relative;
	}
	.title{
		font-size: 15px;
		color: green;
		margin-bottom: 3px;
	}
	.box input, .box textarea{
		border: none;
		border-bottom: 1px solid black;
		width: 99%;
		outline: none;
		margin-bottom: 10px;
		height: 20px;
		resize: none;
		font-family: transparent;
		line-height: 20px;
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
	.wrong{
		color: red;
	}
	.userList{
		width: 90%;
		height: auto;
		background-color: white;
		z-index: 1;
		margin: 0 auto;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: 1px 1px 10px 1px lightgray;
		padding-top: 10px;
		text-align: center;
	}
	.remove{
		color: red;
		float: right;
		margin-right: 10px;
	}
	.sub-btn{
		width: 90%;
		margin-left: 5%;
		height: 30px;
		font-size: 16px;
	}
	.list{
		color: blue;
		font-size: 14px;
		float: right;
		margin-bottom: 5px;
	}
	.wrong, .special{
		color: red;
		font-size: 13px;
	}
	.name{
		display: inline-block;
		width: 70px;
		float: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
</style>