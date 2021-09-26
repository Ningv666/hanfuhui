<template>
<div>
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
 </div>    
</template>



<style lang="scss" scoped>
@import '../assets/styles/main.css'
</style>


<script>

export default {
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