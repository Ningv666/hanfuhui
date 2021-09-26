<template>
  <div>    

    <div class="big_title">
      账号
    </div>
    <van-cell-group title-class="title">
      <van-cell title-class="title" title="账号管理" is-link />
      <van-cell title-class="title" title="隐私设置" is-link />
      <van-cell title-class="title" title="实名认证" is-link  value="未认证"/>
    </van-cell-group>
   
    <div class="big_title">
      通用
    </div>
    <van-cell-group title-class="title">
      <van-cell title-class="title" title="通用设置" is-link />
      <van-cell title-class="title" title="推送通知" is-link />
      <van-cell title-class="title" title="地址管理" is-link />
      <van-cell title-class="title" title="青少年模式" is-link  />
    </van-cell-group> 
        <div class="big_title">
      关于
    </div>
    <van-cell-group title-class="title">
      <van-cell title-class="title" title="隐私权政策" is-link />
      <van-cell title-class="title" title="用户协议" is-link />
      <van-cell title-class="title" title="关于我们" is-link/>
    </van-cell-group> 
    <div class="title bottom" @click="outlogin">退出登录</div>
    </div>    
</template>
<style lang="less" scoped>
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
export default {
  data() {
    return {
    }
  },
    mounted() {
   },
    methods: {
      outlogin(){
        Dialog.confirm({
        title: '提示',
        message: '确认要退出登录嘛？',
      }).then(() => {
          this.$store.commit('quitLogin');
          sessionStorage.removeItem('islogin');
          sessionStorage.removeItem('uid');
          sessionStorage.removeItem('uname');
          sessionStorage.removeItem('picture');
          console.log(sessionStorage.getItem('islogin'));
          console.log(111);
          this.$router.push('/user');
        }).catch(() => {
          // on cancel
        });

            }
    },

}
</script>