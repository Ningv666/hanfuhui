<template>
  <div class="sdetails">
    <div class="header_bg" :style="`background-image: url(${study.img})`">
      <div class="icon" @click="back">
        <!-- <router-link to="/study"> -->
    <van-icon class="iconfont icon-ziyuan" color="white" size="10"/>
    <!-- </router-link> -->
    </div>    
    <div>
</div>
    </div>
    <div class="content">
      <div class="title">{{study.title}}</div>
      <div class="info">
      </div>
    </div>
    <van-cell size="small" :border="false" title-style="font-size:0.35rem;" style="align-items: center;padding:2vw 3vw">
    <div slot="icon" style="padding-right:2vw">
    <van-image
  round
  width="10vw"
  height="10vw"
  :src="study.userpic"
/></div>
    <div slot="title">{{study.username}}</div>
    <div slot="label" >
      {{study.time?study.time.slice(5,7):''}}-{{study.time?study.time.slice(8,10):''}}
    </div>
  </van-cell>
<div class="article_info">
  <div class="study_info" v-html="study.des">
  </div>
</div>
    <div class="content_tabbar">
        <div class="com_input">
          <input type="text " placeholder="笔墨已备，请君一言">
        </div>
        
      <div class="item">
      <van-icon @click="iscollect($event)" v-show="!hascollect" class="iconfont icon-shoucang1" size="24" style="padding-right:1vw"/>
      <van-icon @click="nocollect($event)" v-show="hascollect" class="iconfont icon-biaoqianA01_shoucang-13" size="24" style="padding-right:1vw" color="pink"/>
 
      </div>
      <div class="item">
      <van-icon class="iconfont icon-31zhuanfa" size="24" @click="showShare = true"/>
      </div>
    </div>
    <div class="list">
      <div class="item border"><span class="count">0 条评论</span></div>
    <!-- 显示没有评论提示 -->
    <div class="notice" >
      <img src="/img/notice/global_see_more@2x.df75a477.png" alt="">
      <div class="com_notice" >
        这里还没有评论哦~
      </div>
    </div>
    </div>


    <van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/> 
  </div>
</template>

<style lang="less" scoped>
@import '../assets/styles/main.css';
.van-cell {
  border-radius: 5vw;
}
.bg {
  width: 100vw;
  height: 50vw;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    div{
      width: 100%;
      height: 120vw;
      background-size: cover;
      background-position: center center;
    }
  }
.border {
  border-top: 1px solid rgb(230, 229, 229);
  padding-top: 5vw;
}
</style>
<script>
export default {
  props:['sid'],
  data() {
    return {
      showShare: false,
      hascollect:false,
      study:[],
      options: [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' },        
      ]
    }
  },
  mounted() {
    this.axios.get(`/study?id=${this.sid}`).then(res=>{
      console.log(res.data[0]);
      this.study = res.data[0];
    })
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
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
  },
}
</script>