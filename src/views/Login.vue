<template>
<div>
  <div class="bg">
        <div class="icon">
      <router-link to="/user">
    <van-icon class="iconfont icon-ziyuan" color="white" size="14" /></router-link>  </div> 
   </div>   
    <div class="content" >
      <div class="title">
        密码登录
      </div>
<van-form @submit="onSubmit">
  <van-field
    v-model="phone"
    name="phone"
    label="手机号"
    placeholder="手机号"
    :rules="[{ pattern, message: '请填写正确的手机号' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="upwd"
    label="密码"
    placeholder="密码"
    :rules="[{ validator, message: '请填写正确密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" color="#7DCFDA">登录</van-button>
  </div>
</van-form>
<div class="bar">
  <div class="left"><span @click="showOption1($event)">验证码登录</span></div>
  <div class="right"><i @click="showRes">未注册？</i></div>

</div>
</div>

<div class="content_1" v-show="0">
      <div class="title">
        验证码登录
      </div>
<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="手机号"
    label="手机号"
    placeholder="手机号"
    :rules="[{ pattern, message: '请填写手机号' }]"
  />
<van-field
  v-model="sms"
  center
  clearable
  name="验证码"
  label="验证码"
  placeholder="请输入短信验证码"
>
  <template #button>
    <van-button size="small" type="primary">发送验证码</van-button>
  </template>
</van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" color="#7DCFDA">登录</van-button>
  </div>
</van-form>
<div class="bar">
  <div class="left"><span @click="showOption2($event)">密码登录</span></div>
  <div class="right"><i @click="showRes">未注册？</i> </div>

</div>
</div>
<div class="bottom_part">
<van-icon class="iconfont icon-QQ-circle-fill" size="38" color="#24ABF2"></van-icon>
<van-icon class="iconfont icon-weixin" size="38" color="#21D86E"></van-icon>
<van-icon class="iconfont icon-weibo-" size="38" color="#FC011A"></van-icon>
</div>
<!-- 显示注册页 -->
<van-popup
  v-model="showres"
  closeable
  position="right"
  close-icon="arrow-left"
  close-icon-position="top-left"
  :style="{ height: '100vh' }"
>
<Res></Res>
</van-popup>
</div>
</template>
<style lang="less" scoped>
.van-popup--bottom {
  /deep/.van-popup__close-icon {
  color:white;
}}
  .bg {
    width: 100vw;
    overflow: hidden;
    height: 100vw;
    background-image: url("../assets/img/bg/20210908171405.jpg");
    background-size: cover;  
    position: relative;
    .icon {
      position: absolute;
      top: 5vw;
      left: 5vw;
    }  
  }
  .van-popup {
  /deep/.van-popup__close-icon {
    color: white;
  }}
  .content,.content_1 {
    margin: -15vw auto;
    margin-bottom: 0;
    width: 90vw;
    height: 300px ;
    .title {
      margin-bottom:5vw;
      font-weight: bold;
      font-size: 24px;
      color: #7DCFDA;

    }
    // background-color: red;
  }
.bar {
  font-size: 14px;
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between; 
 
   i {
     font-style: normal;
     color: red;} 

}
.bottom_part {
  position: fixed;
  bottom: 5vw;
  width: 80vw;
  margin: 0px 10vw;
  display: flex;
  justify-content: space-around;
}
</style>
<script>
import  Res from '../components/Res.vue'
export default {
  components:{Res},
  data() {
    return {
      phone:'',//电话号码
      password:'',//密码
      username:'',//电话
      sms:'',//验证码
      showres:false,//是否出现注册页  
      pattern:/^1[3|5|7|8]\d{9}$/, //验证手机号码的正则  
    }
  },
  methods: {
    onSubmit(values) {
      this.axios.post('/users/login',values).then(res=>{
        if(res.data.code==200){
          let form = {};
          form.uname = res.data.data[0].uname;
          form.uid = res.data.data[0].uid;
          form.picture = res.data.data[0].picture;
          this.$store.commit('loginOK',form);
          console.log(form);
          sessionStorage.setItem('islogin',true);
          sessionStorage.setItem('uname',form.uname);
          sessionStorage.setItem('uid',form.uid);
          sessionStorage.setItem('picture',form.picture);
          this.$toast.success({message:'登录成功'});
          setTimeout(()=>{
            this.$router.push('/user');
          },2000)
        }else {
          this.$toast.fail({message:res.data.msg});
        }
      })
    },
    validator(val) {//验证密码的规范性
      return /^[a-zA-Z0-9]{6,10}$/.test(val);
    },
    showOption1(e){
      let a = e.target.parentElement.parentElement.parentElement;
      a.style.display = 'none';
      a.nextSibling.style.display = 'block';
    },
    showOption2(e){
      let a = e.target.parentElement.parentElement.parentElement;
      a.style.display = 'none';
      a.previousSibling.style.display = 'block';
    },
    showRes(){
      this.showres = true;
      console.log('出现');
    }
  },
}
</script>