<template>
  <div class="footer">
    <ul>
      <router-link :to="{name:'first', params:{sign: this.$route.params.sign}}"><li><span :class="[main_icon, {main: main}]"></span><span>主页</span></li></router-link>
      <router-link :to="{name:'group', params:{sign: this.$route.params.sign}}"><li><span :class="[list_icon, {list: list}]"></span><span>通讯录</span></li></router-link>
      <router-link :to="{name:'set', params:{sign: this.$route.params.sign}}"><li><span :class="[set_icon, {set: set}]"></span><span>设置</span></li></router-link>
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #FCFCFC;
}
li{
  display: flex;
  height: 50px;
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
.main_icon{
  display: inline-block;
  background: url('../assets/img/main.png');
  width: 26px;
  height: 30px;
  margin-top: -2px;
  margin-bottom: -5px;
  background-size: 26px 29px;
  background-position: 0px 1px;
}
.list_icon{
  display: inline-block;
  background: url('../assets/img/list.png');
  width: 30px;
  height: 28px;
  margin-top: -2px;
  margin-bottom: -5px;
  background-size: 29px 28px;
}
.set_icon{
  display: inline-block;
  background: url('../assets/img/set.png');
  width: 30px;
  height: 30px;
  margin-top: -3px;
  margin-bottom: -5px;
  background-size:33px 33px;
}
.main{
  background: url('../assets/img/main1.png');
  background-size: 26px 29px;
  background-position: 0px 1px;
}
.list{
 background: url('../assets/img/list1.png');
 background-size: 29px 28px;
}
.set{
 background: url('../assets/img/set1.png');
 background-size:33px 33px;
}
</style>
