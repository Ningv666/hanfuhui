<template>
<div class="center">
  <!-- header部分 -->
  <div class="header">
    <div class="userinfo">
      <div class="left">
        <img :src="$store.state.picture" alt="">
        <div class="info">
        <div class="username">
         {{$store.state.uname}} 
        </div>
        <div class="userid">
          圈圈号：{{$store.state.uid}}
        </div></div>
      </div>
      <div class="right">
        <div class="center">
        <router-link to="#">
          <span>个人主页 </span>
           <img src="/img/avatar/arror.png" alt="">
          </router-link></div>
      </div>
    </div>
    <div class="show">
      <div class="item">
        <span class="count">{{collects.length}}</span>
        <span class="text">点赞</span>
      </div>
            <div class="item">
        <span class="count">{{works.length}}</span>
        <span class="text">作品</span>
      </div>
            <div class="item">
        <span class="count">{{comments.length}}</span>
        <span class="text">评论</span>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="content_item">
      <div class="title">
        创作者中心
      </div>
      <div class="item">
        <van-grid :border="false">
  <van-grid-item  >  
    <van-icon class="iconfont icon-chuangzuozhezhongxin" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      创作中心
    </div>
  </van-grid-item>

    <van-grid-item  >  
    <van-icon class="iconfont icon-zhibo" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      我要直播
    </div>
  </van-grid-item>
    <van-grid-item  >  
    <van-icon class="iconfont icon-caogaoxiang" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      草稿箱
    </div>
  </van-grid-item>
    <van-grid-item @click="toSet">  
   <van-icon class="iconfont icon-shezhi" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
     设置
    </div>
  </van-grid-item>
</van-grid>
      </div>
    </div>
        <div class="content_item">
      <div class="title">
        我的服务
      </div>
      <div class="item">
        <van-grid :border="false">
  <van-grid-item  @click="toCollect">  
    <van-icon class="iconfont icon-shoucang1" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      收藏
    </div>
  </van-grid-item>
    <van-grid-item  >  
    <van-icon class="iconfont icon-jiangpin" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      我的奖品
    </div>
  </van-grid-item>
    <van-grid-item  >  
    <van-icon class="iconfont icon-kefu-xianxing" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      联系客服
    </div>
  </van-grid-item>
    <van-grid-item  >  
    <van-icon class="iconfont icon-huiyuanzhongxin" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      会员中心
    </div>
  </van-grid-item>
</van-grid>
      </div>
    </div>
        <div class="content_item">
      <div class="title">
        更多服务
      </div>
      <div class="item">
        <van-grid :border="false">
  <van-grid-item  >  
    <van-icon class="iconfont icon-dongman" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      动漫画
    </div>
  </van-grid-item>
    <van-grid-item  >  
    <van-icon class="iconfont icon-gouwuche" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      MALL
    </div>
  </van-grid-item>
    <van-grid-item  >  
    <van-icon class="iconfont icon-cebianlan_cailing_" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      视频彩铃
    </div>
  </van-grid-item>
    <van-grid-item  >  
    <van-icon class="iconfont icon-yundayin" slot="icon" size="24" color="black"/>
    <div slot="text" class="textstyle">
      彩印
    </div>
  </van-grid-item>

</van-grid>
      </div>
    </div>
  </div>


<!-- 底部导航栏 -->
<Tabbar></Tabbar>
</div>
</template>
<style lang="less" scoped>
@import '../assets/styles/main.css';
.center .header .userinfo .left .userid {
  width: 40vw;
}
.tab_nav {

.van-tabs{

    /deep/.van-tabs__wrap {
            height: 40px ;

        }
      /deep/  .van-tabs__nav--card {
        display: flex;
        justify-content: flex-start;      
        height: 30px;
        border: none;       
        border-radius: 10px;
        font-size: 12px;

    }
    /deep/ .van-tab {
    border-radius: 15px;
    border: none;
    -webkit-flex: none; 
    margin: 3px 5px;
    padding: 0px 10px;
    .van-tab--active {
        font-size: 12px ;
    }
    .van-tab__text {
        font-size: 12px;
    }
}}
}
input::-webkit-input-placeholder {
    color: #6CC5D0 !important;
}
</style>
<script>
import {mapState} from 'vuex'
import Tabbar from '../components/Tabbar';
export default {
  components:{Tabbar},
  data() {
    return {
      tabactive:0,//雅集按时间分类
      smalltab:'1.1',//表示小tab
      gettop:0,//离顶部的距离
      keyvalue:'',
      ishow:0,
      collects:[],//用来保存用户的收藏信息
      comments:[],//用来保存用户的评论信息
      works:[]//用来保存用户的作品信息
    }
  },
  mounted(){
    this.axios.get(`/users/uinfo?uid=${this.uid}&uname=${this.uname}`).then(res=>{
      console.log(res.data);
      this.collects = res.data.collects;
      this.comments = res.data.comments;
      this.works = res.data.works;
    })
  },
  computed:{
    ...mapState(['uid','uname'])
  },
  methods: {
    toSet(){
      this.$router.push('/centerinfo/1')
    },
    toCollect(){
      this.$router.push('/centerinfo/2')
    },
  },
  watch: {

  }
}
</script>