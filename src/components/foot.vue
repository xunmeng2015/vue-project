<template>
  <div class="footer">
    <ul>
      <router-link to="/first"><li><span class="main_icon">111</span><span>主页</span></li></router-link>
      <router-link to="/group"><li><span class="list_icon">111</span><span>通讯录</span></li></router-link>
      <router-link to="/set"><li><span class="set_icon">111</span><span>设置</span></li></router-link>
    </ul>
  </ul>
  </div>
</template>

<script>
export default{
  data(){
    return {
    }
  }
}
</script>

<style scoped>
body{
  height: 100%;
  width: 100%;
}
a{
  text-decoration: none;
}
.footer{
  width: 100%;
  position: fixed;
  bottom: 0;
}
ul{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #FCFCFC;
}
li{
  display: flex;
  height: 45px;
  line-height: 15px;
  flex-direction: column;
  flex-shrink: 1;
  justify-content: space-around;
  align-items: center;
}
a{
  color: black;
}
a:visited{
  color: transparent;
}
</style>
