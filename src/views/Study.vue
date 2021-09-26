<template>
<div class="study">
  <!-- header部分 -->
    <div class="header">
        <div class="bg">
        </div>
        <div class="showbg" id="imgshow" style="display:none">
            <img src="../assets/img/study/1.png" alt="">
        </div>
     <van-search v-model="keyvalue" @focus="toSearch"  class="act_search"  shape="round" background="transform" placeholder="搜索">
    <van-icon name="icon_search" slot="left-icon"  class="iconfont icon-xingtaiduICON_sousuo--" color="#6CC5D0" size="18"/>
    </van-search>   
    <!-- 标签栏 -->
    <van-tabs v-model="tabactive"  background="transparent" title-inactive-color="#569da7" title-active-color="#569da7" sticky offset-top="20">
        <van-tab>
            <div slot="title">入坑指南</div>
            <div class="tab_nav">
                <van-tabs v-model="smalltab" swipeable background="transparent" type="card" color="#569da7" sticky offset-top="64">
                    <van-tab v-for="item of smalltype" :key="item.name">
                        <div slot="title" @click="gettype($event)">{{item.name}}</div>
                        <div :name="item.name"  class="study_content">
                            <div v-if="studys.length!=0" class="content_items" id="items">
                                    <van-list v-model="loading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                    @load="onLoad">
                                
                                <div class="content_item" v-for="item of studys" :key="item.ssid" >
                                    <router-link :to="`/studydetails/${item.ssid}`">
                                    <div class="left" :style="        `background-image: url(${item.img})`">
                                    </div>
                                    <div class="right">
                                        <div class="info_title">
                                        {{item.title}}                                     </div>
                                        <div class="content" v-html="item.des">
                                        </div>
                                    </div></router-link>
                                </div>
                            </van-list>
                            
                            </div>
                            <div v-else class="notice">
                                <img src="/img/notice/global_see_more@2x.df75a477.png" alt="">
                                <div class="com_notice" >
                                    此处暂无内容
                                </div>
                                
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </van-tab>
        <van-tab>
            <div slot="title">形制科普</div>
            <div class="tab_nav">
                <van-tabs v-model="smalltab" swipeable background="transparent" type="card" color="#569da7">
                    <van-tab v-for="item of smalltype" :key="item.name">
                        <div slot="title" @click="gettype($event)">{{item.name}}</div>
                        <div :name="item.name"  class="study_content">
                            <div v-if="studys.length!=0" class="content_items" id="items">
                                    <van-list v-model="loading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                    @load="onLoad">
                                <div class="content_item" v-for="item of studys" :key="item.ssid"  >
                                                                                    <router-link :to="`/
                           studydetails/${item.ssid}`">
                                <div class="left" :style="        `background-image: url(${item.img})`">
                                    </div>
                                    <div class="right">
                                        <div class="info_title">
                                        {{item.title}}                                     </div>
                                        <div class="content" v-html="item.des">
                                        </div>
                                    </div></router-link>
                                </div>
                            </van-list>
                            
                            </div>
                            <div v-else class="notice">
                                <img src="/img/notice/global_see_more@2x.df75a477.png" alt="">
                                <div class="com_notice" >
                                    此处暂无内容
                                </div>
                                
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </van-tab>
        <van-tab>
            <div slot="title">汉服历史</div>
            <div class="tab_nav">
                <van-tabs v-model="smalltab" swipeable background="transparent" type="card" color="#569da7">
                    <van-tab v-for="item of smalltype" :key="item.name">
                        <div slot="title" @click="gettype($event)">{{item.name}}</div>
                        <div :name="item.name"  class="study_content">
                            <div v-if="studys.length!=0" class="content_items" id="items">
                                    <van-list v-model="loading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                    @load="onLoad">
                                <div class="content_item" v-for="item of studys" :key="item.ssid" >                   <router-link :to="`/studydetails/${item.ssid}`">
                                <div class="left" :style="        `background-image: url(${item.img})`">
                                    </div>
                                    <div class="right">
                                        <div class="info_title">
                                        {{item.title}}                                     </div>
                                        <div class="content" v-html="item.des">
                                        </div>
                                    </div></router-link>
                                </div>
                            </van-list>
                            
                            </div>
                            <div v-else class="notice">
                                <img src="/img/notice/global_see_more@2x.df75a477.png" alt="">
                                <div class="com_notice" >
                                    此处暂无内容
                                </div>
                                
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </van-tab>
        <van-tab>
            <div slot="title">礼仪人文</div>
            <div class="tab_nav">
                <van-tabs v-model="smalltab" swipeable background="transparent" type="card" color="#569da7">
                    <van-tab v-for="item of smalltype" :key="item.name">
                        <div slot="title" @click="gettype($event)">{{item.name}}</div>
                        <div :name="item.name"  class="study_content">
                            <div v-if="studys.length!=0" class="content_items" id="items">
                                    <van-list v-model="loading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                    @load="onLoad">
                                <div class="content_item" v-for="item of studys" :key="item.ssid"  >
                                <router-link :to="`/studydetails/${item.ssid}`">
                                <div class="left" :style="        `background-image: url(${item.img})`">
                                    </div>
                                    <div class="right">
                                        <div class="info_title">
                                        {{item.title}}                                     </div>
                                        <div class="content" v-html="item.des">
                                        </div>
                                    </div></router-link>
                                </div>
                            </van-list>
                            
                            </div>
                            <div v-else class="notice">
                                <img src="/img/notice/global_see_more@2x.df75a477.png" alt="">
                                <div class="com_notice" >
                                    此处暂无内容
                                </div>
                                
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </van-tab>
    </van-tabs>
    </div>
    
<!-- 底部导航栏 -->
<Tabbar></Tabbar>
</div>
</template>
<style lang="less" scoped>
@import '../assets/styles/main.css';
.van-search {
    background-color: rgba(255, 255, 255, 0.01);
    height: 25vw;
}
.van-search__content {
    background-color: rgba(250, 250, 250, 0.7);
    input::-webkit-input-placeholder {
        color: #569da7;
    }
    z-index: 1;
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

</style>
<script>
import Tabbar from '../components/Tabbar';
export default {
    components:{Tabbar},
  data() {
    return {
      active:3,//底部导航栏
      tabactive:0,//一级分类
      smalltab:'秒懂汉服',//表示小tab
      gettop:0,//离顶部的距离
      keyvalue:'',
      ishow:0,
      page:1,
      smalltype:{},//用来存放二级分类
      studys:{},//用来存放学堂列表
      type:'',
      loading: false,
      finished: false,
    }
  },
  mounted(){
    window.addEventListener("scroll",this.toTop,true);
    this.getType(this.tabactive+1);
    this.getStudy(1,'',(res)=>{
        this.studys = res;
    })
  },
  methods: {
      toSearch(){
          this.$router.push('/search/3');
      },
       onLoad() {
      setTimeout(() => {
        this.getStudy(++this.page,this.type,(res)=>{
            if(res.length>0){
              this.studys.push(...res);  
            }
            if(res.length<10){
                this.finished = true;
            }
        // 加载状态结束
        this.loading = false;
        })          
      }, 1000);
    },
      toTop(){
        this.gettop =document.documentElement.scrollTop;
        if(this.gettop>100){
            this.ishow =1;
        }else {
            this.ishow =0;
        }        
      },
      getStudy(page,type,callback){
          this.axios.get(`/studys?page=${page}&type=${type}`).then(res=>{
              callback(res.data);
          })
      },
      getType(type){
          this.axios.get(`/stype?id=${type}`).then(res=>{
              this.smalltype = res.data.result;
          })
      },
      gettype(e){
          this.type = e.target.innerHTML;
         this.page = 1;
            this.getStudy(1,this.type,(res)=>{
                this.studys =res;
            })
      }
  },
  watch: {
      ishow: function(){
          var imgshow = document.getElementById('imgshow');
          if(this.ishow==1){
              imgshow.style.display = 'block';
          }else {
              imgshow.style.display = 'none';
          }
      },
      tabactive(newval){
          this.page=1;
          this.axios.get(`/stype?id=${newval+1}`).then(res=>{
            this.smalltype = res.data.result;
            this.smalltab = this.smalltype[0].name;//使默认的继续是第一个
            this.type = this.smalltype[0].name;//使默认的继续是第一个
            
          })      
      },
      type(newval){
          this.getStudy(1,newval,(res)=>{
              this.studys = res;
          })
      }
  }
}
</script>