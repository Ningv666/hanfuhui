<template>
    <div>
    <form action="/">
    <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    shape="round"
  />
</form>
<div class="hot">
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
export default {
    components:[],
    data() {
        return {
            value:''
        }
    },
    methods: {
        onCancel(){
            this.$router.go(-1);
        },
        onSearch(val){
            console.log(val);
        }

    },
}
</script>