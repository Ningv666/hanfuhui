<template>
<div>
  <div class="resbg">
  </div>   
    <div class="content" >
      <div class="title">
        新用户注册
      </div>
      <div class="form">
<van-form @submit="onSubmit">
  <van-field
    v-model="phone"
    name="phone"
    label="手机号"
    placeholder="请输入手机号"
    :rules="[{ pattern, message: '请填写正确的手机号' }]"
  />
  <van-field
    v-model="uname"
    name="uname"
    label="用户名"
    placeholder="请输入用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="upwd"
    type="password"
    name="upwd"
    label="密码"
    placeholder="6-10位数字和字母"
    :rules="[{ validator, message: '请填写规范的密码' }]"
  />
    <van-field
    v-model="repwd"
    type="password"
    name="repwd"
    label="确认密码"
    placeholder="请再次输入密码"
    :error-message="remessage"
    @blur="checkRepwd"
  />
  <van-field name="gender" label="性别">
  <template #input>
    <van-radio-group v-model="gender" direction="horizontal">
      <van-radio name="0">男</van-radio>
      <van-radio name="1">女</van-radio>
    </van-radio-group>
  </template>
</van-field>
  <div style="margin: 16px;" >
    <van-button round block type="info" native-type="submit" color="#7DCFDA">注册</van-button>
  </div>
<van-field name="checkbox" label=" " style="padding:0">
  <template #input>
    <van-checkbox v-model="checkbox" shape="square">同意汉服荟的相关协议</van-checkbox>
  </template>

</van-field>
</van-form></div>

</div>
</div>
</template>
<style lang="scss" scoped>
  .resbg {
    width: 100vw;
    overflow: hidden;
    height: 50vw;
    background-image: url("../assets/img/bg/ooYBAGDexsmAH4KNAAFC7E1smrM898.jpg");
    background-size: cover;    
  }
  .content {
    margin: -25vw auto;
    margin-bottom: 0;
    width: 90vw;
    // background-color: white;
    border-radius: 10px;
    height: 300px ;
    .title {
      margin-bottom:5vw;
      font-weight: bold;
      font-size: 24px;
      color: white;

    }
    .form {
      border-radius: 15px;
      width: 86vw;
      padding: 2vw;
      background-color: white;
    }
    // background-color: red;
  }
.bar {
  font-size: 14px;
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end; 
  a {
    color: red;
  }
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
export default {
  data() {
    return {
      phone:'',//电话号码
      upwd:'',//密码
      uname:'',//用户名
      repwd:'',//确认密码
      gender:'1',//性别
      checkbox:true,//是否勾选协议
      pattern:/^1[3|5|7|8]\d{9}$/, //验证手机号码的正则
      remessage:'',//显示再次输入密码不正确的提示
    }
  },
  methods: {
    onSubmit(values) {
      if(this.checkbox&&!this.remessage){
        console.log('submit', values);
        this.axios.post('/users/reg',values).then(res=>{
          if(res.data.code==201){
            this.$toast.fail({message:res.data.msg});
          }else {//注册成功
          let form = res.data.result[0];
          console.log(form);
          form.isLogin = true;
          this.$store.commit('loginOK',form);            
          sessionStorage.setItem('islogin',true)
          sessionStorage.setItem('uname',form.uname)
          sessionStorage.setItem('uid',form.uid)
          sessionStorage.setItem('picture',form.picture)
          this.$toast.success({message:res.data.msg});
          setTimeout(()=>{
            this.$router.push('/user');
          },2000)
          }
        })
      }else if(!this.checkbox){
        this.$toast.fail({message:'请勾选协议'});
      }else if(this.remessage) {
        this.$toast.fail({message:'两次密码输入不一致'});
      }     
    },
     validator(val) {//验证密码的规范性
      return /^[a-zA-Z0-9]{6,10}$/.test(val);
    },
    checkRepwd(){//验证两个密码是否相等
      if(this.upwd!=this.repwd){
        this.remessage='两次输入的密码不一样';
      }else {
        this.remessage='';
      }
    }
  },
}
</script>