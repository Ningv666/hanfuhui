<template>
  <div>
    <div class="study_content">
      <div v-if="list.length > 0" class="content_items" id="items">
        <van-list>
          <div class="content_item" v-for="item of list" :key="item.ssid">
            <router-link :to="`/studydetails/${item.ssid}`">
              <div class="left"
                :style="`background-image: url(${item.img})`"
              ></div>
              <div class="right">
                <div class="info_title">
                  {{ item.title }}
                </div>
                <div class="content" v-html="item.des"></div></div>
                </router-link>
          </div>
        </van-list>
      </div>
      <div v-else class="notice">
        <img src="/img/notice/global_see_more@2x.df75a477.png" alt="" />
        <div class="com_notice">都翻过了，什么都没有找到</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../assets/styles/main.css';
  .study_content {
    position: relative;
    margin: 5px 5vw;
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
      margin-bottom: 0px;
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
          bottom: 1vw;
          right: 0;
          width: 95%;
          margin-left: 5px;
          height: 61px;
          overflow: hidden;
          font-size: 0.32rem;
          display: -webkit-box;          
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  overflow: hidden;
  .com_notice {
    color: #585757;
    font-size: 0.4rem;
    padding: 5vw 0vw;
  }
}
</style>
<script>
export default {
  props: ["list"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.list);
  },
  methods: {
    toDetail(e, path) {
      this.$router.push(`/articledetails/${path}`);
    },
  },
};
</script>