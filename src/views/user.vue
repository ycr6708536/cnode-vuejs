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
      <li  :class='{"selected":selectItem === 2}'  @click='changeItem(2)'>最新发布</li>
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

  export default {
    data (){
      return {
        user: {},
        currentData:[],
        selectItem: 1
      }
    },
    route: {
      data (transition){
        let _this = this;
        let loginname = transition.to.params.loginname;

        $.get('/api/v1/user/'+loginname,function(data){
          if(data && data.data){
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
        console.log(idx)
        this.selectItem = idx;
        this.currentData = (idx ===1 ? this.user.recent_replies:this.user.recent_topics);
      }
    },
    components: {
      navCon
    }
  }
</script>

<style type="text/css">
  @import '../assets/iconfont/iconfont.css';
  .userInfo{
    margin-top: 50px;
    width: 100%;
    background-color: #fff;
    text-align: center;
    height: 180px;
    background-color: #e7e7e7;
  }
  .userPic{
    display: block;
    width: 100px;
    height: 100px;
    margin: 15px auto 0 auto;
    border: 1px solid #F3F3F3;
    border-radius: 50%;
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
    box-sizing:border-box;
  }
  .userScore{
    width: 50%;
    float: left;
    text-align: right;
    padding-right: 10px;
    color: #80bd01;
    box-sizing:border-box;
  }
  .topics{
  }
  .t-nav{
    width: 100%;
    height: 41px;
    list-style: none;
    border-bottom: solid 1px #d4d4d4;
    position: relative;
    box-sizing:border-box;
  }
  .t-nav li{
    width: 50%;
    padding: 7.5px 0;
    float: left;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    box-sizing:border-box;
  }
  .br{
    border-right: solid 1px #d4d4d4;
  }
  .selected{
    color: #ff5a5f;
    border-bottom: solid 2px #ff5a5f;
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
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
  .icon-empty {
    font-size: 125px;
    color: #d4d4d4;
    display: block;
    box-sizing:border-box;
  }
  .t-title{
    font-size: 18px;
    font-weight: bold;
    width: 100%;
  }
  .head{
    display: inline-block;
    width: 45px;
    height: 45px;
    border: 2px solid #fff6e6;
    border-radius: 50%;
    margin-right: 10px;
  }
  .cl{
    float: left;
    width: 70%;
  }
  .cr{
    float: left;
    width: 30%;
    text-align: right;
  }
  .cl .name{
    display: block;
    color: #626262;
  }
  .cr .name{
    display: block;
    margin-top: 10px;
    color: #80bd01;
    font-size: 12px;
  }
  .info{
    display: block;
    flex: 1;
    box-sizing: border-box;
  }
  .user{
    display: flex;
    padding: 10px;
  }

</style>