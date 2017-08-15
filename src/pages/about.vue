<template>
<div>
  <div class="container">
  	<center><h1 class="red">关于小信使</h1></center>
  	<p>小信使用来提醒自己或者他人到点应该做的事情</p>
  	<p>从前端、后台、设计(手动滑稽，太丑了哈哈)，前前后后花了一个星期，将1.0版本实现出来，1.0版本还有一些未知的bug和功能没有实现，会在之后的版本继续完善，敬请期待。</p>
    <center><h1 class="red">使用指南</h1></center>
    <p><span class="red">1. </span>第一次登陆请务必在<span class="red">设置页面</span>设置自己的登陆密码，方便下次登陆更加快捷。如果登录密码忘记了，也可以在使用验证码登录以后重新设置。</p>
    <p><span class="red">2. </span>你可以使用小信使添加联系人，添加通知分组。如果你要多次、同时将计划告诉别人的话，建议你新建一个分组，这样的话新建通知的时候就方便很多</p>
    <p><span class="red">3. </span>新建分组以后，可以点击<span class="red">展开分组</span>列表以后，通过点击相应的分组名称查看分组信息，并且能够进行删除和添加组员。</p>
    <p><span class="red">4. </span>新建联系人以后，通过点击联系人查看详细信息，并且能够进行删除和修改信息。</p>
    <p><span class="red">5. </span>新建通知页面，目前最多只能选择三个时间段进行通知，所以请考虑好什么时候通知最为合适。</p>
    <p><span class="red">6. </span>新建通知以后，如果还未发送通知，则可以在主页，通过<span class="red">往右滑动</span>进行撤回，如果通知已经发送完毕，你也可以通过滑动进行删除记录，删除的记录将不会再出现在历史通知列表里面。</p>
    <p>如果有问题的话欢迎随时与我联系。下面是我的二维码：</p><br>
  	<center>
  		<img src="../assets/img/qrcode.png">
  	</center>
    <p class="red">以后所有的版本更新和通知都会发布在这个页面噢！</p>
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
.red{
  color: red;
}
</style>
