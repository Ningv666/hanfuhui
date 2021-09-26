<template>
  <div class="showdetails">

    <div class="icon">
      <router-link to="/activity">
    <van-icon class="iconfont icon-ziyuan" color="white" size="16" /></router-link>  </div>   

  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#6CC5D0">
    <van-swipe-item><div :style="`background-image:url(${show.img1})`"></div></van-swipe-item>
    <van-swipe-item v-if="show.img2!=''"><div :style="`background-image:url(${show.img2})`"></div></van-swipe-item>
  </van-swipe>


<van-cell style="margin-top:20px" :title="show.title" value="免费" label="热门活动" title-class="title" value-class="value">

</van-cell>
<van-cell style="margin-top:10px" :title="show.date" icon="clock-o" />
<van-cell :title="show.address
" icon="location-o" />
<h4>发起人</h4>
<van-cell  size="small" :border="false" title-style="font-size:0.35rem;" style="align-items: center;padding:2vw 3vw">
  <div slot="icon" style="padding-right:3vw;">
  <van-image 
  round
  width="13vw"
  height="13vw" style="margin-top:2vw"
  :src="show.userpic"
/></div>
    <div slot="title">{{show.username}}</div>
    <div slot="label" >
      {{moment.unix(show.time).format('MM-DD')}}
    </div>
  </van-cell>
<h4>活动介绍</h4>
<div class="des">
{{show.des}}
</div>
<div class="notice">
  温馨提示:本活动信息由用户自行发布，汉服荟仅提供信息展示平台,不能保证活动的真实性和安全性,请在参加活动前与活动发起人核实相关信息，注兹人身安全与财产安全。

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
    div{
      width: 100%;
      height: 100vw;
      background-size: cover;
      background-position: center center;
    }
  }

</style>
<script>
export default {
  props:['ssid'],
  data() {
    return {
      showShare: false,
      hascollect:false,
      show:[],
      options: [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' },        
      ]
    }
  },
  mounted() {
    console.log(this.ssid);
    window.scrollTo(0,0);
    this.axios.get(`/show?id=${this.ssid}`).then(res=>{
      console.log(res);
      this.show = res.data.result[0];
      console.log(this.show.img2=='');

    })
  },
  methods: {
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