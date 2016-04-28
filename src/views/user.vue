<template>
  <nav-con page-type="用户信息" ></nav-con>
  <section class="userInfo">
    <img class="userPic" :src="user.avatar_url">
    <span class="userName" v-text="user.loginname"></span>
    <div class="userBtn">
      <span class="userTime" v-text="user.create_at | getLastTimeStr false"></span>
      <span class="userScore">积分：{{user.score}}</span>
    </div>
  </section>
  <section class="topics">
    <ul class="t-nav">
      <li class="br" :class='{"selected":selectItem === 1}' @click='changeItem(1)'>最近回复</li>
      <li :class='{"selected":selectItem === 2}' @click='changeItem(2)'>最新发布</li>
    </ul>
    <div class="message" v-for="item in currentData">
      <section class="user">
         <img class="head" :src="item.author.avatar_url"
              v-link="{name:'user',params:{loginname:item.author.loginname}}" />
          <div class="info" v-link="{name:'topic',params:{id:item.id}}">
              <div class="t-title">{{item.title}}</div>
              <span class="cl">
                  <span class="name">{{item.author.loginname}}</span>
              </span>
              <span class="cr">
                  <span class="name">{{item.last_reply_at | getLastTimeStr true}}</span>
              </span>
          </div>
      </section>
    </div>
    <div class="no-data" v-show="currentData.length === 0">
      <i class="iconfont icon-empty">&#xe60a;</i>
      暂无数据!
    </div>
  </section>
</template>

<script type="text/javascript">
  import navCon from '../components/Nav'
  //import myAlert from '../components/myAlert'

  export default {
    data (){
      return {
        user: {},
        currentData:[],
        selectItem: 1//1最近回复，2最新发布
      }
    },
    route: {
      data (transition){
        let _this = this;
        let loginName = transition.to.params.loginname;

        $.get('/api/v1/user/'+loginName,function(data){
          id(data && data.data){
            let d = data.data;
            _this.user = d;
            if(d.recent_replies.length >0){
              _this.currentData = d.recent_replies;
            }else{
              _self.currentData = data.recent_topics;
              _this.selectItem = 2;
            }
          }
        });
      }
    },
    methods: {
      changeItem (idx){
        this.selectItem = idx;
        this.currentData = idx ===1 ? this.user.recent_replies:this.user.recent_topics;
      }
    },
    components: {
      navCon
    }
  }
</script>

<style type="text/css">
  .userInfo{
    margin-top: 50px;
    width: 100%;
    background-color: #fff;
    text-align: center;
    height: 180px;
    box-shadow: 0px 5px 5px #888888;
  }
  .userPic{
    display: block;
    width: 100px;
    height: 100px;
    margin-top: 15px;
    border: 1px solid #F3F3F3;
    border-radius: 10px;
  }
  .userName{
    color: #000;
  }
  .userBtn{
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
  }
  .userTime{
    width: 50%;
    float: left;
    padding-left: 10px;
  }
  .userScore{
    width: 50%;
    float: right;
    padding-right: 10px;
    color: color: #80bd01;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    word-wrap: break-word;
  }
  .t-nav{
    width: 100%;
    height: 41px;
    list-style: none;
    border-bottom: solid 1px #d4d4d4;
    position: relative;
  }
  .t-nav li{
    width: 50%;
    padding: 12.5px 0;
    float: left;
    font-size: 16;
    text-align: center;
    font-weight: bold;
  }
  .br{
    border-right: solid 1px #d4d4d4;
  }
  .selected{
    color: #ff5a5f;
    border-bottom: solid 2px #ff5a5f;
  }
  .message{
    background-color: #fff;
    padding: 5px;
    border-bottom: solid 1px #d4d4d4;
  }
  .no-data{
    width: 100%;
    height: 100%;
    padding: 40% 0;
    color: #d4d4d4;
    display: inline-block;
    font-size: 18px;
    text-align: center;
  }
  .iconfont{
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon-empty{
    font-size: 125px;
    color: #d4d4d4;
    display: block;
  }
</style>