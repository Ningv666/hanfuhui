<template>
<div class="tabbar">

<!-- 导航栏 -->
<van-tabbar fixed   active-color="#6CC5D0" inactive-color="#b0c0c0" route>
  <van-tabbar-item replace  to="/user" >
    <div slot="icon"><van-icon class="iconfont icon-shouye2" size="22"/></div>
    <div>首页</div> 
    </van-tabbar-item>
    <van-tabbar-item replace  to="/activity" >
    <div slot="icon"><van-icon class="iconfont icon-icon_huaban1fuben22" size="22"/></div>
    <div>雅集</div> 
    </van-tabbar-item>
    <van-tabbar-item replace  :to="$store.state.isLogin?'/add':'/login'" >
    <div slot="icon"><van-icon class="iconfont icon-tianjiah" size="30" color="#6CC5D0"/></div>
    </van-tabbar-item>
    <van-tabbar-item replace to="/study" >
    <div slot="icon"><van-icon class="iconfont icon-xuetang" size="22"/></div>
    <div>学堂</div>
    </van-tabbar-item>
    <van-tabbar-item replace  :to="$store.state.isLogin?'/center':'/login'" >
    <div slot="icon"><van-icon class="iconfont icon-wode" size="22"/></div>
    <div>我的</div> 
    </van-tabbar-item>
</van-tabbar>

</div>
</template>
<style lang="less" scoped>
.tabbar {
  width: 100vw;
  height: 50px;
}
.van-tabbar {
width: 80vw;
border-radius: 10vw;
overflow: hidden;
margin: 0px 10vw;
box-shadow: 0px 0px 10px 1px #6CC5D0;
}
.van-tabbar--fixed {
  bottom: 3vw;
  position: fixed;
  
}

</style>


<style lang="scss" scoped>
@import '../assets/styles/main.css'
</style>
<script>
export default {
  data() {
    return {



    }
  },
}
</script>