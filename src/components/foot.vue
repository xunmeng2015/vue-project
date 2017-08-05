<template>
  <div class="footer">
    <ul>
      <router-link :to="{name:'first', params:{sign: this.$route.params.sign}}"><li><span :class="[main_icon, {main: main}]"></span><br><span>主页</span></li></router-link>
      <router-link :to="{name:'group', params:{sign: this.$route.params.sign}}"><li><span :class="[list_icon, {list: list}]"></span><br><span>通讯录</span></li></router-link>
      <router-link :to="{name:'set', params:{sign: this.$route.params.sign}}"><li><span :class="[set_icon, {set: set}]"></span><br><span>设置</span></li></router-link>
    </ul>
  </ul>
  </div>
</template>

<script>
export default{
      data(){
        return {
          main_icon : "main_icon",
          main: false,
          list_icon: "list_icon",
          list: false,
          set_icon: "set_icon",
          set: false
        }
      },
      mounted:function(){
        var url = window.location.href;
        if(url.indexOf("first") != -1){
          this.main = true;
        }
        else if(url.indexOf("group") != -1){
          this.list = true;
        }
        else if(url.indexOf("set") != -1){
          this.set = true;
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
-moz-column-count:3;  /* Firefox */
-webkit-column-count:3; /* Safari 和 Chrome */
column-count:3;
background-color: #FCFCFC;
border-top: 1px solid lightgray;
/*height: 50px;*/
}
li{
  text-align: center;
  margin-bottom: 2px;
  margin-top: 2px;
  font-size: 15px;
}
a{
  color: black;
}
a:visited{
  color: transparent;
}
.main_icon{
  display: inline-block;
  background: url('../assets/img/main.png');
  width: 26px;
  height: 30px;
  margin-top: -2px;
  background-size: 26px 29px;
  background-position: 0px 1px;
}
.list_icon{
  display: inline-block;
  background: url('../assets/img/list.png');
  width: 30px;
  height: 30px;
  margin-top: 1px;
  background-size: 30px 30px;
}
.set_icon{
  display: inline-block;
  background: url('../assets/img/set.png');
  width: 30px;
  height: 30px;
  margin-top: -2px;
  background-size:35px 35px;
}
.main{
  background: url('../assets/img/main1.png');
  background-size: 26px 29px;
  background-position: 0px 1px;
}
.list{
 background: url('../assets/img/list1.png');
 background-size: 30px 30px;
}
.set{
 background: url('../assets/img/set1.png');
 background-size:35px 35px;
}
</style>
