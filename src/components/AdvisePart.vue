<template>
<div class="main">  
  <!-- 轮播图部分 -->
  <div class="swipe_bg">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#6CC5D0">
        <van-swipe-item v-for="item of imgs" :key="item.cid" ><router-link :to="item.href"><img :src="item.url" :href="item.href"></router-link></van-swipe-item>
      </van-swipe>
  </div>
  <!-- 话题部分 -->
  <div class="topic">
          <div class="items">
            <van-swipe :loop="false" :width="250" :touchable="true"  :show-indicators="false">
            <van-swipe-item v-for="item of topics" :key="item.cid" style="width:40vw">
          <div class="topic_item">
            <div class="topic_top">
              <van-icon class="iconfont icon-huati" color="#FF770C" size="12"/>
              {{item.name}}
            </div>
            <div class="topic_buttom">
              <router-link to="/showtopics">
              查看更多 <van-icon name="arrow"/></router-link>
          </div>
        </div></van-swipe-item>
              <van-swipe-item style="width:40vw">
          <div class="topic_item">
            <div class="topic_top">
              <div>
              <span class="title">更多</span></div>
              <div>
              <span class="text">精彩话题</span></div>
              
            </div>
            <div class="topic_buttom_more">
              <router-link to="/showtopics">
              立即前往 <van-icon name="arrow" color="white"/></router-link>
          </div>
        </div></van-swipe-item>
            </van-swipe>
        </div>
  </div>
  <!-- 主要图文部分 -->
  <div class="main_content" infinite-scroll-distance="100" 
  infinite-scroll-disabled="busy" v-infinite-scroll="loadmore" :infinite-scroll-immediate-check="true">
      <div class="content_item" v-for="item of articles" :key="item.aid">
        <router-link :to="`/articledetails/${item.aid}`">
            <img :src="item.img" alt="">
            <div class="subtitle">{{item.title}}</div>
            <div class="author_info">
              <div class="author_img ">
                  <img :src="item.picture" alt="">
                  <span class="name van-ellipsis"> {{item.author}}&nbsp;&nbsp;</span>&nbsp;
                  <van-icon class="iconfont icon-fire icon" color="#FF3300"/>
              </div>             
            </div></router-link>
          </div>
  </div>
    <div class="notice" v-show="nshow">
            虽到底，缘未尽...
      </div>
</div>
</template>
<style lang="less" scoped>
@import '../assets/styles/main.css';
    .main .main_content{
      margin-bottom: 40vw;
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
</style>
<script>
export default {
  mounted(){
    this.axios.get('/carousel').then(res=>{
      window.scrollTo(0,0);
      this.imgs = res.data.lunbo;
      this.topics = res.data.topicpart;
    });
    this.getArticles(this.page,(res)=>{      
      this.articles = res.result;
    });
  },  
  methods: {
    getArticles(page,callback){
      this.axios.get(`/articles?page=${page}`).then(res=>{
        callback(res.data);     
      })
    },
    loadmore(){
      this.busy = true;
      this.$toast.loading({message:'加载中...'});
      setTimeout(()=>{
        console.log('到底了');
        this.getArticles(++this.page,(articlelist)=>{
          if(articlelist.result.length>0){
            this.nshow = false;
            this.$toast.clear();
            this.articles.push(...articlelist.result);
            this.busy = false;
          }else{
            this.nshow = true;
          }
        })
      },3000)
    }

  },
  data() {
    return {
      imgs:[],//保存轮播图图片
      topics:[],//保存话题列表
      articles:[],//保存文章列表
      page:1,
      busy:false,//避免重复调用loadmore方法
      nshow:false//控制提示信息显示
    }
  },

}
</script>