<template>
  <div>    
  <van-nav-bar  :title="option==1?'设置':'收藏'" fixed>
  <template #left>
    <div>
      <router-link to="/center">
      <van-icon class="iconfont icon-ziyuan" color="black" size="8"
      /></router-link>
    </div>
  </template>
</van-nav-bar>
  <div class="content">
   <Collect v-if="option==2"></Collect>
    <Set v-else></Set>
 
    </div>    
  </div>
</template>
<style lang="less" scoped>
  .content {
    margin-top: 0.123vw;
  }
  .title {
    color: rgb(122, 122, 122);
    font-size: 0.35rem;
    letter-spacing: 1px;
    font-family: "黑体";
  }
  .van-cell__left-icon, .van-cell__right-icon {
    font-size: 0.35rem;
  }
  .big_title {
    font-size: 0.45rem;
    padding: 20px 16px;
    font-family: "黑体";
    font-weight: normal;
    color: black;
  }
  .bottom {
    text-align: center;
    margin-top: 10vw;
    margin-bottom: 8vw;
    font-size: 0.40rem;
  }
</style>
<script>
import {Dialog} from 'vant'
import Set from '../components/Set.vue'
import Collect from '../components/Collect.vue'
export default {
  props:['option'],
  components:{Set,Collect},
  data() {
    return {
      title:'设置'
    }

  },
    mounted() {

    },
    methods: {

    },

}
</script>