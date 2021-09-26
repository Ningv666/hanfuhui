<template>
  <div>
    <van-nav-bar
    fixed
  title="话题列表"
  @click-left="onClickLeft"
>
  <template #left>
    <div slot="icon">
      <van-icon class="iconfont icon-ziyuan" color="black" size="14"/>     
    </div>
  </template>
</van-nav-bar>
<div class="showtopic_bg">
  <img src="../assets/img/bg/oYYBAGEvHWaAC3DgAAJVFEKzFvQ458.png" alt="">
</div>
<van-cell-group>
    <van-cell  v-for="item of topics" :key="item.cid">
      <div slot="title">       
        <van-icon class="iconfont icon-huati" color="#FF770C" style="margin-right:2vw"/>
        <span>{{item.name}}</span> 
      </div>
      <div slot="label">
        {{item.content}}
      </div>
  </van-cell>

</van-cell-group>
  </div>
</template>
<style lang="scss" scoped>  
.topicimg {
  position: relative;
  width: 20px;
  img {
    width: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
.van-nav-bar {
  width: 100vw;
  overflow: hidden;
}
.van-hairline--bottom::after {
  border: none;
}
  .showtopic_bg {
    overflow: hidden;
    margin-top: 46px;
    padding: 5vw;
    border-bottom: 1px solid whitesmoke;
    img {
      width: 90vw;
    }
  }

</style>
<script>
export default {
  data(){
    return {
      topics:[]
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push('/user')
    }
  },
  mounted(){
    this.axios.get('/topics').then(res=>{
      this.topics = res.data.topics;
    })
  }
}
</script>

