<template>
  <div>
    <div class="activity">
          <div v-if="list.length>0" class="tab_contents" id="items" >
            <van-list>
                <div v-for="i of list" :key="i.sid" class="content_item">
                    <router-link :to="`/showdetails/${i.sid}`">
                    <div class="left" :style="`background-image: url(${i.img1})`">
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
          <div v-else class="notice">
              <img src="/img/notice/global_see_more@2x.df75a477.png" alt="">
              <div class="com_notice" >
                都翻过了，什么都没有找到
              </div>                                
                </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../assets/styles/main.css';
   .activity .tab_contents{
      margin-bottom: 0px;
    }
  .notice {
      position: fixed;
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

export default {
    props:['list'],
  data() {
    return {
    }
  },
  mounted() {
      console.log(this.list);
  },
  methods: {

  }

}
</script>