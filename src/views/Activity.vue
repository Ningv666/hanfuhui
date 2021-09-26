<template>
<div class="activity">
  <!-- header部分 -->

    <van-search v-model="keyvalue" show-action class="act_search"  shape="round" background="#6CC5D0" placeholder="搜索活动名称或地点" @focus="toSearch">
    <van-icon name="icon_search" slot="left-icon"  class="iconfont icon-xingtaiduICON_sousuo--" color="#6CC5D0" size="18"/>
    </van-search>
    <!-- 轮播图部分 -->
        <div class="swipe_bg" >
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#6CC5D0" >
                <van-swipe-item v-for="item of lunbo" :key="item.id" ><router-link :to="item.href"><img :src="item.url" alt=""></router-link></van-swipe-item>


            </van-swipe>
            </div>
    <!-- 主要图文部分 -->
    <!-- 标签栏 -->
    <van-tabs v-model="tabactive" swipeable sticky offset-top="54">
        <van-tab>
            <div slot="title">进行中</div>
            <div class="tab_contents">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                <div v-for="i of shows" :key="i.sid" class="content_item">
                    <router-link :to="`/showdetails/${i.sid}`">
                    <div class="left" :style="`        background-image: url(${i.img1})`">
                     <!-- //背景图   -->
                    </div>
                    <div class="right">
                        <div class="info_title">
                            {{i.title}}
                        </div>
                        <div class="buttom">
                        <div class="text">
                            <span>{{i.address}}</span></div>
                        <div class="text">
                            <span>
                                {{i.date?i.date.split('-')[0].split(' ')[0]:''}}-{{i.date?i.date.split('-')[1].split(' ')[0]:''}}
                            </span>
                        </div>                        
                        <div class="price">
                            免费
                        </div>
                        </div>
                    </div></router-link>
                </div>
                </van-list>
            </div>
        </van-tab>
        <van-tab>
            <div slot="title">即将开始</div>
            <div class="tab_contents">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                <div v-for="i of shows" :key="i.sid" class="content_item">
                    <router-link :to="`/showdetails/${i.sid}`">
                    <div class="left" :style="`        background-image: url(${i.img1})`">
                     <!-- //背景图   -->
                    </div>
                    <div class="right">
                        <div class="info_title">
                            {{i.title}}
                        </div>
                        <div class="buttom">
                        <div class="text">
                            <span>{{i.address}}</span></div>
                        <div class="text">
                            <span>
                                {{i.date.split('-')[0].split(' ')[0]}}-{{i.date.split('-')[1].split(' ')[0]}}
                            </span>
                        </div>                        
                        <div class="price">
                            免费
                        </div>
                        </div>
                    </div></router-link>
                </div>
                </van-list>
            </div>
        </van-tab>
        <van-tab>
            <div slot="title">已结束</div>
            <div class="tab_contents">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                <div v-for="i of shows" :key="i.sid" class="content_item">
                    <router-link :to="`/showdetails/${i.sid}`">
                    <div class="left" :style="`        background-image: url(${i.img1})`">
                     <!-- //背景图   -->
                    </div>
                    <div class="right">
                        <div class="info_title">
                            {{i.title}}
                        </div>
                        <div class="buttom">
                        <div class="text">
                            <span>{{i.address}}</span></div>
                        <div class="text">
                            <span>
                                {{i.date.split('-')[0].split(' ')[0]}}-{{i.date.split('-')[1].split(' ')[0]}}
                            </span>
                        </div>                        
                        <div class="price">
                            免费
                        </div>
                        </div>
                    </div></router-link>
                </div>
                </van-list>
            </div>
        </van-tab>
    </van-tabs>
<!-- 底部导航栏 -->
<Tabbar></Tabbar>
</div>
</template>
<style lang="less" scoped>
@import '../assets/styles/main.css';
.van-tabs {
    top: 54px;
   /deep/ .van-tab {
    justify-content: flex-start;
    -webkit-flex:none;
    -webkit-justify-content: flex-start;
    padding: 0 4vw;
}
}
.act_search{   
    position: fixed;
    top: 0px;
    width: 100vw;
    z-index: 1;
    .van-search__action {
     color: white;   
    }
}
.my-swipe .van-swipe-item {
  // padding: 5vw;
  // width: 100%;
  text-align: center;
  // background-color: #F7F7F7;
  // overflow: hidden;
    img {
      width: 90vw;     
      border-radius: 10px;
      
      
    }
}
.swipe_bg {
  padding: 5vw 0vw;
  position: relative;
    top: 54px;
    padding-bottom: 0vw;
  width: 100%;

}
</style>
<script>
import Tabbar from '../components/Tabbar';
export default {
components:{Tabbar},
  data() {
    return {
      tabactive:0,//雅集按时间分类
      keyvalue:'',//搜索关键词
      shows:[],//雅集列表
      lunbo:[],
      page:1,
      loading: false,
      finished: false   
    }
  },
  methods: {
      toSearch(){
          this.$router.push('/search/2');
      },
      getShows(page,type,callback){
        this.axios.get(`/shows?page=${page}&type=${type}`).then(res=>{
            callback(res.data.result);
        })
      },
    onLoad() {
      setTimeout(() => {
        this.getShows(++this.page,this.tabactive+1,(showlist)=>{
            if(showlist.length>0){
            this.shows.push(...showlist);
            }            
            if (showlist.length<10) {
            this.finished = true;// 数据全部加载完成
        }
        // 加载状态结束
        this.loading = false;
            });
      }, 2000);
    },
  },
  mounted() {
      this.axios.get('/lunbo').then(res=>{
          this.lunbo = res.data;
      });
        this.getShows(1,1,(showlist)=>{
            this.shows = showlist;
        })
  },
  watch:{
      tabactive(newval){
          window.scrollTo(0,0);
            this.page =1;
            this.nshow = false;
            this.getShows(this.page,newval+1,(showlist)=>{
                this.shows = showlist;
            })
      }
  }
}
</script>