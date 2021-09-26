<template>
  <div class="concern_part">
    <div class="concern_item">
    <van-cell-group :border="false" size="small">
  <van-cell size="small" :border="false" title-style="font-size:12px;margin-top:-5px" >
    <div slot="icon" style="padding-right:2vw">
    <van-image
  round
  width="11vw"
  height="11vw"
  src="img/avatar/oYYBAGCbTsKAITmlAADLBUTdJDM641.png"
/></div>
    <div slot="title">国风正当潮</div>
    <div slot="label" >
      08-08
    </div>
  </van-cell>
    <div class="content">
      <video src="video\1010912712_fsNlzMrP.mp4" class="content_video" controls>

      </video>
    </div>
        <div class="content_tabbar">
      <div class="item">
      <van-icon class="iconfont icon-shoucang1" size="24" style="padding-right:1vw"/>
      </div>
      <div class="item">
      <van-icon class="iconfont icon-quanbupinglun" size="24" style="padding-right:1vw"/>
      <span>评论</span>
      </div>
      <div class="item">
      <van-icon class="iconfont icon-31zhuanfa" size="24" @click="showShare = true"/>
      </div>
    </div>
<van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/> 
    <div class="video_info">
      <div class="title">
        蜀绣又名川秀，一根细细的银针，织就蜀地锦绣山河
      </div>
      <div class="topic">
        <van-notice-bar  color="#FA9772" background="#FBF9ED">
          <div slot="left-icon" class="iconfont icon-huati" style="padding-right:5px"  ></div>
  <span>乞巧节·这手艺惊艳所有人</span> 
</van-notice-bar>
      </div>
    </div>
</van-cell-group>
</div>
<div class="concern_item">
    <van-cell-group :border="false" size="small">
  <van-cell size="small" :border="false" title-style="font-size:12px;margin-top:-5px" >
    <div slot="icon" style="padding-right:2vw">
    <van-image
  round
  width="11vw"
  height="11vw"
  src="img/avatar/oYYBAGCbTsKAITmlAADLBUTdJDM641.png"
/></div>
    <div slot="title">国风正当潮</div>
    <div slot="label" >
      08-08
    </div>
  </van-cell>
    <div class="content">
      <video src="video\1010912712_fsNlzMrP.mp4" class="content_video" controls>

      </video>
    </div>
        <content-tab></content-tab>
    <div class="video_info">
      <div class="title">
        蜀绣又名川秀，一根细细的银针，织就蜀地锦绣山河
      </div>
      <div class="topic">
        <van-notice-bar  color="#FA9772" background="#FBF9ED">
          <div slot="left-icon" class="iconfont icon-huati" style="padding-right:5px"  ></div>
  <span>乞巧节·这手艺惊艳所有人</span> 
</van-notice-bar>
      </div>
    </div>
</van-cell-group>
</div>
  </div>
</template>



<style lang="scss" scoped>
@import '../assets/styles/main.css'

</style>


<script>
import ContentTab from './ContentTab.vue'
export default {
  components:{ContentTab},
  data(){
    return {
      showShare: false,
      gettop:0,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' },
        ],
      ],
    }
  },
    methods: {
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },

  },
}
</script>