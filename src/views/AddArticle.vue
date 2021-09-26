<template>
  <div class="add_article">
<van-nav-bar >
  <template #left>
    <div class="font_color"> 
      <router-link to="/user">
      取消</router-link>
    </div>
  </template>
  <template #right>
  <div>
   <van-button round type="info" color="#6CC5D0" @click="send">发布</van-button>
  </div>
  </template>
</van-nav-bar>
<div class="fileupload">
<van-uploader v-model="fileList" :before-read="beforeRead" :max-size="500 * 1024" :max-count="3" multiple  :after-read="afterRead">
  <template #preview-cover="{  }">
    <div class="preview-cover van-ellipsis">{{ }}</div>
  </template>
  
</van-uploader></div>
 <div class="input_area">
  <van-field
  v-model="title"
  rows="1"
  autosize
  type="textarea"
  placeholder="标题(选填)"
/>
<van-field
  v-model="content"
  rows="2"
  autosize
  type="textarea"
  maxlength="200"
  placeholder="填写内容"
  show-word-limit
/></div>
<van-cell is-link @click="showPopup">
  <van-icon class="iconfont icon-huati" style="padding-right:5px" color="#FF770C"></van-icon><span id="topic">添加话题</span></van-cell>
<van-popup v-model="show" position="right" :style="{ height: '100%' }" >
  <div class="top_title">

  
  热门话题推荐</div>
  <div class="content">
<van-cell-group>
  <van-cell v-for="item of topic" :key="item.id" :title="item.name"  label="热门话题" @click="selectTopic($event,item.name)" >
    <div slot="icon"  class="topicimg"><img src="img/notice/topic.png" alt=""></div>
  </van-cell>

</van-cell-group></div>
</van-popup>
  </div> 
  
</template>





<style scoped lang="less">
@import '../assets/styles/main.css';
  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
.van-button--normal {
    padding: 1px 22px;
    font-size: 14px;
    height: 40px;
}
.van-hairline--bottom::after {
  border:0px;
}
.van-nav-bar {
/deep/.van-nav-bar__content {
  height: 60px;
}

}

.fileupload {
  // width: 100vw;
  // height: 50vw;
  padding: 5vw;
  overflow: hidden;
}
.input_area {
  width: 100vw;
  overflow: hidden;
}
.font_color {
  a {
    color: black;
    font-weight: normal;
  }
}
.topicimg {
  width: 50px;
  img {
    padding: 2vw;
    width: 30px;
    height: 30px;
  }
}
.top_title{
  width: 45vw;
  font-size: 18px;
  font-weight: bold;
  padding: 5vw;
}
</style>

<script>
export default {
  data() {
    return {
      show:false,
      title:'',
      content:'',
      file:{},
      fileList: [
       
      ],
      file:[],
      topic:[],
      chosetopic:''

    }
  },
  mounted() {
    this.axios.get('/topics').then(res=>{
      console.log(res);
      this.topic = res.data.topics;
    })
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    selectTopic(event,name){
      console.log(name);
      let span = document.getElementById('topic');
      span.innerHTML = name;
      this.chosetopic = name;
      this.show = false;
    },
    send(){
      let obj = {
        title:this.title,
        content:this.content,
        topic:this.chosetopic,
        uid:sessionStorage.getItem('uid'),
        files:this.file
      }
      if(obj.files.length==0){
        this.$toast.fail({message:'至少要上传一张图片哦~'});
      }else {
        this.axios.post('/users/addarticle',obj).then(res=>{
          console.log(res);
          if(res.data.code==200){
            this.$toast.success({message:res.data.msg});
            this.$router.push('/user')
          }else {
            this.$toast.fail({message:res.data.msg});
          }
        })
      }
      console.log(obj);
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器 
      const formData = new FormData();  // 声明一个FormData对象
	    formData.append("file", file.file);

      this.axios.post('/users/upload',formData,{
	            headers: {
	              "content-type": "multer/form-data"
	            }
	          }).then(res=>{
        let str = res.data[0].path.replace(/\\/g,"/");
        let s = str.substring(str.indexOf('/')+1)
        this.file.push(res.config.baseURL+s);
      })


    },
     beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },


  },
}
</script>