<template>
  <div class="adetails">
    <div class="header">
      <div class="icon" @click="back">
    <van-icon class="iconfont icon-ziyuan" color="black" size="10"
    /> </div>    
    <div>
    <van-cell size="small" :border="false" title-style="font-size:0.35rem;" style="align-items: center;padding:2vw 3vw">
    <div slot="icon" style="padding-right:2vw">
    <van-image
  round
  width="10vw"
  height="10vw"
  :src="article.picture"
/></div>
    <div slot="title">{{article.author}}</div>
    <div slot="label" >
      {{moment.unix(article.time).format('MM-DD')}}
    </div>
  </van-cell>
</div>
    </div>
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item @click="showImg($event,0)"><div :style="`background-image:url('${article.img}')`"></div></van-swipe-item>
  <van-swipe-item @click="showImg($event,index+1)" v-for="(item,index) of imgs" :key="item.iid"><div :style="`background-image:url('${item.img}')`"></div></van-swipe-item>


</van-swipe>
<div class="article_info">
  <div class="title">
    {{article.title}}
  </div>
  <div class="info">
    {{article.content}}
  </div>
</div>
<div v-show="article.topic" class="topic">
    <van-notice-bar  color="#FA9772" background="#FBF9ED">
          <div slot="left-icon" class="iconfont icon-huati" style="padding-right:5px"  ></div>
  <span >{{article.topic}}</span> 
</van-notice-bar>
      </div>
    <div class="content_tabbar">
        <div class="com_input">
          <input type="text " placeholder="笔墨已备，请君一言" @keyup.13="addcomment($event)">
        </div>       
      <div class="item">
      <van-icon @click="iscollect($event)" v-show="!hascollect" class="iconfont icon-shoucang1" size="24" style="padding-right:1vw"/>
      <van-icon @click="nocollect($event)" v-show="hascollect" class="iconfont icon-biaoqianA01_shoucang-13" size="24" style="padding-right:1vw" color="pink"/>
 
      </div>
      <div class="item">
      <van-icon class="iconfont icon-31zhuanfa" size="24" @click="showShare = true"/>
      </div>
    </div>
    <div class="list" >
      <div class="item"><span class="count">{{comments.length}} 条评论</span></div>
      <div class="item" v-for="item of comments" :id="item.cid" :key="item.cid">
    <van-cell size="small" :border="false" title-style="font-size:0.35rem;" style="align-items: center;padding:2vw 3vw" @click="delcomment($event)" :value="item.uname==uname?'删除':''">
    <div slot="icon" style="padding-right:2vw">
    <van-image
  round
  width="10vw"
  height="10vw"
  :src="item.picture"
/></div>
    <div slot="title">{{item.uname}}</div>
    
    <div slot="label" >
     {{moment.unix(item.time).format('MM-DD HH:mm')}}
    </div>

     
  </van-cell>
  <div class="content_com">
    {{item.content}}
  </div>
    </div>
    <!-- 显示没有评论提示 -->
    <div class="notice" v-show="comments.length==0">
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

</style>
<script>
import {mapState} from 'vuex'
import {Dialog} from 'vant'
import { ImagePreview } from "vant";
export default {
  
  props:['aid'],
  data() {
    return {
      showShare: false,
      hascollect:false,
      options: [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' },        
      ],
      article:{},//保存文章信息
      imgs:[],//保存文章图片
      comments:[],//保存文章评论
      aimg:[],//保存文章的所有图片
    }
  },
  mounted() {
    window.scrollTo(0,0);
      this.axios.get(`/article?id=${this.aid}`).then(res=>{
      this.article = res.data.details[0];
      this.imgs = res.data.imgs;
      this.aimg.push(this.article.img);
      for(var i of this.imgs){
       this.aimg.push(i.img); 
      }     
      this.comments = res.data.result;
    })
    this.collect();
  },
  methods: {
    onSelect(option){
      Toast(option.name);
      this.showShare = false;
    },
    back(){
      this.$router.go(-1)
    },
    showImg(e,index){
      ImagePreview({
        images:this.aimg,
        startPosition:index,
      })},
    //发表评论
    addcomment(e){
      if(this.isLogin){//用户已登录则可收藏
      let obj = {}
      obj.aid = this.aid;
      obj.uid = this.uid;
      obj.content = e.target.value;
      this.axios.post('/users/addcomment',obj).then(res=>{
        if(res.data.code==200){          
          this.axios.post('/users/selcomment',obj).then(res=>{
            this.comments = res.data.result;
          });
          this.$toast({message:res.data.msg});
        }else {
          this.$toast({message:res.data.msg});
        }
      });}else {
        Dialog.confirm({
        title: '提示',
        message: '发表要先登录哦~是否现在去登录？',
      }).then(() => {
          this.$router.push('/login');
        }).catch(() => {
          // on cancel
        });
      }
    },
    // 删除评论
    delcomment(e){
      var cid = e.target.parentElement.parentElement.parentElement.id;
      if(e.target.innerHTML=='删除'){
      let obj = {
        cid:cid
      }
      obj.aid = this.aid;
      this.axios.post('/users/delcomment',obj).then(res=>{
        if(res.data.code==200){          
          this.axios.post('/users/selcomment',obj).then(res=>{

            this.comments = res.data.result;
          });
          this.$toast({message:res.data.msg});
        }else {
          this.$toast({message:res.data.msg});
        }
      });
      }
    },
    // 判断是否已收藏
    collect(){
      if(this.isLogin){//用户已登录则可收藏
      let obj = {}
      obj.aid = this.aid;
      obj.uid = this.uid;
      this.axios.post('/users/selcollect',obj).then(res=>{
        if(res.data.code==201){
          this.hascollect = false;
        }else {
          this.hascollect = true;
        }
      })
      }
    },
    // 收藏
    iscollect(e){
      if(this.isLogin){//用户已登录则可收藏
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'block';
      let obj = {}
      obj.id = this.aid;
      obj.uid = this.uid;
      this.axios.post('/users/addcollect',obj).then(res=>{
        console.log(res.data);
        if(res.data.code==200){
          this.$toast({message:res.data.msg});
          this.hascollect = true;
        }else {
          this.$toast({message:res.data.msg});
          this.hascollect = false;
        }
      })
    }else {
      Dialog.confirm({
        title: '提示',
        message: '添加收藏要先登录哦~是否现在去登录？',
      }).then(() => {
          this.$router.push('/login');
        }).catch(() => {
          // on cancel
        });

    }
    },
    // 取消收藏
    nocollect(e){
      e.target.style.display = 'none';
      e.target.previousSibling.style.display = 'block';
      let obj = {}
      obj.aid = this.aid;
      obj.uid = this.uid;
      this.axios.post('/users/delcollect',obj).then(res=>{
        console.log(res.data);
        if(res.data.code==200){
          this.$toast({message:res.data.msg});
          this.hascollect = false;
        }else {
          this.$toast({message:res.data.msg});
          this.hascollect = ture;
        }
        
      })

    },
  },
  computed:{
    ...mapState(['uid','uname','isLogin'])
  }
}
</script>