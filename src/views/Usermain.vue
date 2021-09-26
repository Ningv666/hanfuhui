<template>
<div class="main">
  <!-- header部分 -->
  <van-nav-bar fixed title="主页"   >
  <template #left>
    <div class="white" v-if="!$store.state.isLogin">          
        <span @click="toLogin">登录</span>
    </div>

  <van-image v-else
  round
  width="9vw"
  height="9vw"
  :src="$store.state.picture"
  @click="tocenter"
/>
  </template>
  <template #right>
<router-link to='/search/1'>
    <van-icon class="iconfont icon-xingtaiduICON_sousuo--" color="white" size="20"/></router-link>

  </template>
</van-nav-bar>
<!-- 标签栏 -->
<van-tabs v-model="activetab" animated >
  <van-tab name="1">
    <div slot="title">视频</div>
    <div name="1" class="concern_part" >
      <van-list   v-model="loading"
        :finished="finished"
        finished-text="虽到底，缘未尽..."
        @load="onLoad">
      <div class="concern_item" v-for="item of videos" :key="item.vid">
    <van-cell-group  :border="false" size="small">
  <van-cell size="small" :border="false" title-style="font-size:0.35rem;margin-top:-0.5vw" >
    <div slot="icon" style="padding-right:2vw">
      <van-image
        round
        width="11vw"
        height="11vw"
        :src="item.picture"
      />
    </div>
    <div slot="title">{{item.author}}</div>
    <div slot="label" >
      {{item.time}}
    </div>
  </van-cell>
    <div class="content">
      <video :src="item.video" class="content_video" :poster="item.img" id="video" @click="player($event)" @timeupdate="updatetime($event)" @loadedmetadata="gettime($event)">
      </video>
      <div class="becenter">
        <img @click="beginPlay($event)" src="video/player.png" alt="">
      </div>
      <div class="time">
        <span>1'30'</span>
      </div>
    </div>
        <div class="content_tabbar">
      <div class="item">
      <van-icon @click="iscollect($event)" v-show="!hascollect" class="iconfont icon-shoucang1" size="24" style="padding-right:1vw"/>
      <van-icon @click="nocollect($event)" v-show="hascollect" class="iconfont icon-biaoqianA01_shoucang-13" size="26" style="padding-right:1vw" color="pink"/>
      
      </div>
      <div class="item">
      <van-icon class="iconfont icon-quanbupinglun" size="24" style="padding-right:1vw"/>
      <span>评论</span>
      </div>
      <div class="item">
      <van-icon class="iconfont icon-31zhuanfa" size="24" @click="showShare = true"/>
      </div>
    </div>
    <div class="video_info">
      <div class="title">
        {{item.title}}
      </div>
      <div v-show="item.topic" class="topic">
        <van-notice-bar  color="#FA9772" background="#FBF9ED">
          <div slot="left-icon" class="iconfont icon-huati" style="padding-right:5px"  ></div>
  <span >{{item.topic}}</span> 
</van-notice-bar>
      </div>
    </div>
</van-cell-group>
</div></van-list>   
      </div>
  </van-tab>
  <van-tab title="推荐" name="2">
    <div slot="title">推荐</div>
    <div name="2" class="advice_part">
     <AdvisePart v-if="activetab=='2'"/>
    </div>
  </van-tab>
  <!-- <van-tab title="图鉴" name="3">内容 3</van-tab> -->
</van-tabs>
<van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/> 
<van-popup v-model="showsearch" round position="bottom" :style="{ height: '100%' }" >
<Search/>

</van-popup>
<!-- 导航栏 -->
<Tabbar v-show="activetab=='2'"></Tabbar>
</div>
</template>
<style lang="less" scoped>
@import '../assets/styles/main.css';

.van-popup--bottom {
  /deep/.van-popup__close-icon {
  color:white;
}}
.van-tabs--line{
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    width: 100vw;
    z-index: 1;
}}
.van-tabs {
    top: 46px;
   /deep/ .van-tab {
    justify-content: flex-start;
    -webkit-flex:none;
    -webkit-justify-content: flex-start;
    padding: 0 4vw;
}
}
.van-tabs__content {
  /deep/.van-tabs__track {
  top: 90px;
}
}
.advice_part{
  position: relative;
  top: 44px;
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
}
.van-tabs__wrap {
  position: fixed ;
  top:90px;
}
.my-swipe .van-swipe-item {
  text-align: center;
    img {
      width: 90vw;     
      border-radius: 10px;      
    }
}
.swipe_bg {
  padding: 5vw 0vw;
  position: relative;
  padding-bottom: 0vw;
  width: 100%;
  background-color: #F7F7F7;
}
.van-nav-bar {
  background-color: #6CC5D0;
  /deep/ .van-nav-bar__title {
    color:white;
    font-weight: bold;
  }
  /deep/ .van-nav-bar__text {
    color: #F7F7F7;
  }
  .white {   
    color: #F7F7F7;
    font-weight: bold;
  }
}
</style>
<script>
import AdvisePart from '../components/AdvisePart'
import Tabbar from '../components/Tabbar'
import Search from '../components/Search'

export default {
  data() {
    return {
      activetab:'2',
      active:0,
      showShare: false,//空值显示分享页
      vpage:1,//表示视频的页数
      videos:[],//用来存放视频列表
      hascollect:false,//是否已收藏
      options: [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' },        
      ],
      loading: false,
      finished: false,
      showsearch:false
    }
  },  
  mounted(){
    this.getVideos(1,(videoslist)=>{
      this.videos = videoslist;
    })
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
          this.getVideos(++this.vpage,(videolist)=>{
          if(videolist.length>0){           
            this.$toast.clear();
            this.videos.push(...videolist);
            // 数据全部加载完成
            if (videolist.length<5) {
              this.finished = true;
            }}
            // 加载状态结束
            this.loading = false;
        });
      }, 2000);
    },
    getVideos(page,callback){
        this.axios.get(`/video?page=${page}`).then(res=>{
        callback(res.data.result);
    })
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    tocenter(){
      this.$router.push('/center')
    },
    // 控制视频播放
    gettime(e){
      e.target.nextSibling.nextSibling.children[0].innerHTML = this.moment.unix(e.target.duration).format("mm'ss'");
    },
    updatetime(e){
      let time = e.target.duration-e.target.currentTime;
      e.target.nextSibling.nextSibling.children[0].innerHTML =this.moment.unix(time).format("mm'ss'");
      if(time==0){
        e.target.nextSibling.children[0].style.display = 'block';
      }
    },
    beginPlay(e){
      e.target.style.display = 'none';
      e.target.parentElement.previousSibling.play();     
    },
    player(e){
      if(e.target.paused){        
        e.target.play();
        e.target.nextSibling.children[0].style.display = 'none'              
      }else{
        console.log(e.target.paused);
        e.target.pause();       
        e.target.nextSibling.children[0].style.display = 'block';       
      }     
    },
    // 收藏
    iscollect(e){
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'block'
    },
    // 取消收藏
    nocollect(e){
      e.target.style.display = 'none';
      e.target.previousSibling.style.display = 'block';
    },
    toLogin(){
      this.$router.push('/login');
    }
  },
  watch:{
    activetab(){
      window.scrollTo(0,0);
      this.vpage = 1;
    }
  },
  components:{AdvisePart,Tabbar,Search}
}
</script>