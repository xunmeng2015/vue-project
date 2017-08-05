<template>
<div>
  <div class="container">
  	<center><h1>关于小信使</h1></center>
  	<p>解决自己生活中的痛点：总是会忘记一些事情，有一天实在是看不下去了，便想到了用自己学到的知识去解决这个问题。</p>
  	<p>从前端、后台、设计(手动滑稽，太丑了哈哈)，前前后后花了一个星期，将1.0版本实现出来，1.0版本还有很多bug和没有实现的功能，会在以后继续完善。敬请期待，有任何问题可以与我联系。下面是我的二维码：</p><br>
  	<center>
  		<img src="../assets/img/qrcode.png">
  	</center>
  	</div>
    <foot></foot>
  </div>
</template>

<script>
import foot from '../components/foot'
export default{
  data(){
    return {}
  },
  components: {
    foot
  }
}
</script>

<style scoped>
.container{
	padding: 5px;
	font-family: "正楷";
	line-height: 20px;
	margin-bottom:50px;
}
h1{
	margin-bottom: 10px;
}
p{
	text-indent: 2em;
}
img{
	width: 250px;
	height: 250px;
}
</style>
