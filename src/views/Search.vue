<template>
    <div >
    <form action="/">
    <van-search
    v-model="keyvalue"
    show-action
    :placeholder="type==1?'请输入搜索关键词':type==2?'搜索活动名称或地点':'请输入搜索关键词'"
    @search="onSearch"
    @cancel="onCancel"
    shape="round"
  />
</form>

<div class="hot" v-if="showhot">
    <div class="title">热门搜索</div>
    <div class="content">
    <div class="left">
        <ul>
            <li>万物皆可奏</li>
            <li>萌宠也能穿汉服</li>
            <li>什么是汉礼</li>
            <li>国风妆容</li>
        </ul>
    </div>
    <div class="right">
        <ul>
            <li>汉服打卡地</li>
            <li>新学期汉服</li>
            <li>萌新须知</li>
            <li>常见汉服款式小归类</li>            
        </ul>
        </div></div>
</div>
<div class="content" v-else>
<van-tabs v-model="active">
  <van-tab title="帖子">
      <van-list 
        v-model="loading"
        :finished="finished"
        finished-text="虽到底，缘未尽..."
        @load="onLoad">
      <ArticleItem :list="valuelist"/>
      </van-list>
      </van-tab>
  <van-tab title="雅集">
            <van-list 
        v-model="loading"
        :finished="finished"
        finished-text="虽到底，缘未尽..."
        @load="onLoad">
      <ShowItem :list="valuelist"/>
            </van-list>
      </van-tab>
  <van-tab title="学堂">
            <van-list 
        v-model="loading"
        :finished="finished"
        finished-text="虽到底，缘未尽..."
        @load="onLoad">
      <StudyItem :list="valuelist"/>
            </van-list>
      </van-tab>
</van-tabs>
</div>
    </div>
</template>
<style lang="less" scoped>
    .hot {
        width: 90vw;
        margin: 10vw auto;
        .title{
            font-size: .47rem;
            color: gray;
            font-weight: bold;
            letter-spacing: 2px;
        }
        .content {
            margin-top: 5vw;
            display: flex;
            flex: 1;
            .right,.left{
                width: 50%;
                line-height: 8vw;
                font-size: 0.39rem;
                color: rgb(104, 103, 103);
                letter-spacing: 1.2px;
            }
        }
    }
</style>
<script>
import  ArticleItem from '../components/ArticleItem.vue'
import  ShowItem from '../components/ShowItem.vue'
import  StudyItem from '../components/StudyItem.vue'
export default {
    props:['type'],
    components:{ArticleItem,ShowItem,StudyItem},
    data() {
        return {
            valuelist:[],
            showhot:true,
            keyvalue:'',
            active:0,
            option:this.type,
            page:1,
            loading: false,
            finished: false   
        }
    },
    mounted() {
        this.getType();
        this.getList(this.keyvalue,this.option,this.page,(res)=>{
                console.log(res);
                this.valuelist = res.result;
        });
    },
    methods: {
            onLoad() {
                setTimeout(() => {
                    this.getList(this.keyvalue,this.option,++this.page,(res)=>{
                        console.log(111);
                       
                        if(res.result.length>0){
                        this.valuelist.push(...res.result);
                         console.log(this.valuelist);
                        }            
                        if (res.result.length<20) {
                        this.finished = true;// 数据全部加载完成
                    }
                    // 加载状态结束
                    this.loading = false;
                    
                        });
                }, 2000);
            },
        onSearch(){
            this.getList(this.keyvalue,this.option,this.page,(res)=>{
                console.log(res);
                this.valuelist = res.result;
            });
            this.showhot = false;
        },
        getType(){
            if(this.type==2){
                this.active = 1
            }else if(this.type==3){
                this.active = 2;
            }
        },
        onCancel(){
            this.$router.go(-1);
        },
        getList(key,type,page,callback){
            let obj = {
                key,type,page
            }
            this.axios.get(`/users/search?key=${obj.key}&type=${obj.type}&page=${obj.page}`).then(res=>{
                callback(res.data);
                
            })
        }

    },
    watch:{
        active(newval){
            if(newval==0){
                this.page = 1;
                this.getList(this.keyvalue,1,this.page,(res)=>{
                this.valuelist = res.result;
            });
                this.option = 1;
            }else if(newval==1){
                this.page = 1
                this.getList(this.keyvalue,2,this.page,(res)=>{
                this.valuelist = res.result;
            });
                this.option = 2;
            }else if(newval==2){
                this.page = 1;
                this.getList(this.keyvalue,3,this.page,(res)=>{
                this.valuelist = res.result;
            });
                this.option = 3;
            }
        }
    }
}
</script>