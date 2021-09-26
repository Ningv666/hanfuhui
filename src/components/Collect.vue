<template>
  <div>

        <div class="study_content">
          <div v-if="collectlist.length>0" class="content_items" id="items" >
            <van-list>
              <div class="item" v-for="item of collectlist" :key="item.ccid">
            <div class="content_item" @click="toDetail($event,item.id)">
            <!-- <router-link :to="`/articledetails/${item.id}`"> -->
            <div class="left" :style="`background-image: url(${item.img})`">
            </div>
            <div class="right">
            <div class="info_title">
            {{item.title}}
            <div class="bottom" :id="item.ccid">
              <van-icon @click="nocollect($event)"  class="iconfont icon-biaoqianA01_shoucang-13" size="22" style="padding-right:1vw" color="pink"/>
            </div>
            </div>
            <div class="content">
             {{item.content}}
            </div>
            </div>
            <!-- </router-link> -->
            </div>
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

  </div>
</template>
<style lang="less" scoped>

  .study_content {
    margin: 50px 5vw;
    width: 90vw;
    background-color: white;
    border-radius: 10px;
    .item {
      border-bottom: 1px solid rgb(238, 236, 236);
      height: 120px;
      overflow: hidden;
    }
    .notice {
      text-align: center;
      .com_notice {
        color: #585757;
        font-size: 0.40rem;
        padding: 5vw 0vw;
      }     
    }
    .content_items{
      margin-bottom: 65px;
    }
    .content_item {
      a {
        display: block;
      }
      margin: 10px auto;
      width: 85vw;
      height: 100px;
      overflow: hidden;     
      border-radius: 5px;
      position: relative;
      .left {
        float: left;
        width: 38vw;
        height: 100px;
        overflow: hidden;
        border-radius: 2vw;
        background-color: #F7F7F7;
        background-image: url("/img/article/oYYBAGC51tOAVbJGAAFnKtLu4Xk458.jpg");
        background-size: cover;
        background-position: center center;
      }
      .right {
        float: right;
        width: 43vw;
        height: 88px;
        padding: 6px;
        position: relative;
        overflow: hidden;
        .info_title {
          color: #2b2a2a;
          font-size: 0.35rem;
          font-weight: bold;
          width: 95%;
          height: .5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .content{
          position: absolute;
          bottom: 6vw;
          right: 0;
          width: 95%;
          margin-left: 5px;
          height: .9rem;
          overflow: hidden;
          font-size: 0.32rem;
          display: -webkit-box;          
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          color: rgb(199, 202, 202);
        }
        .bottom {
          position: absolute;
          bottom: 0;
          right: 0;
        }
        
      }
    }
  }
  .notice {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      overflow: hidden;
      .com_notice {
        color: #585757;
        font-size: 0.40rem;
        padding: 5vw 0vw;
      }     
    }
</style>
<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      collectlist:[]//保存用户的收藏列表
    }
  },
  mounted() {
    this.getCollect();
  },
  methods: {
    getCollect(){
     let obj = {uid:this.uid}
      this.axios.post('/users/selcollectlist',obj).then(res=>{
        if(res.data.code==200){
          this.collectlist = res.data.result;
        }else {
           this.collectlist = res.data.result;
        }
      })
    },
    toDetail(e,path){
      this.$router.push(`/articledetails/${path}`);
    },
    // 取消收藏
    nocollect(e){
      let obj = {}
      e.stopPropagation();
      obj.cid = e.target.parentElement.id
      this.axios.post('/users/decollect',obj).then(res=>{
        if(res.data.code==200){ 
          this.getCollect();
          this.$toast({message:res.data.msg});         
        }else {
          this.$toast({message:res.data.msg});
        }
        
      })

    },
  },
  computed:{
    ...mapState(['uid','uname','isLogin'])
  }
}
</script>