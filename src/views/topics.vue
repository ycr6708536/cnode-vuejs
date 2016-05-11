<template>
	<nav-con page-type="主题" ></nav-con>
	<section class="page">
		<h2 class="topic-title" v-text="topic.title"></h2>
		<section class="author-info">
			<img class="avatar" :src="topic.author.avatar_url" />
			<div class="col">
          <span v-text="topic.author.loginname"></span>
          <time>
              发布于:{{topic.create_at | getLastTimeStr true}}
          </time>
      </div>
      <div class="right">
          <span class="tag"
                  :class="topic.tab|getTabClassName item.good item.top">
                  {{topic.tab|getTabStr topic.good topic.top}}
          </span>
          <span class="name">{{topic.visit_count}}次浏览</span>
      </div>
		</section>

		<section class="markdown-body topic-content" v-html="topic.content"></section>
	</section>
	<h3 class="topic-reply">
		 <strong>{{topic.reply_count}}</strong> 回复
	</h3>

	<section class="reply-list">
		<ul>
			<li v-for="item in topic.replies">
				<section class="user">
					<img :src="item.author.avatar_url" class="head" v-link="{name:'user',params:{loginname:item.author.loginname}}" />
					<div class="info">
						<span class="cl" >
							<span class="name" v-text="item.author.loginname"></span>
              <span class="name mt10">
                <span></span>
                发布于:{{item.create_at | getLastTimeStr true}}
              </span>
						</span>
						<span class="cr">
							<span class="iconfont icon"
                  :class="{'uped':isUps(item.ups)}"
                  @click="upReply(item)">&#xe608;</span>
              {{item.ups.length}}
              <span class="iconfont icon" @click="addReply(item.id)">&#xe609;</span>
						</span>
					</div>
				</section>
				<div class="reply_content" v-html="item.content"></div>

			</li>
		</ul>
	</section>
	<reply v-if="userId"
		:topic.sync="topic"
		:topic-id="topicId"
		:reply-id=""></reply>
	<div class='no-data' v-if="noData">
    <i class="iconfont icon-empty">&#xe60a;</i>
    该话题不存在!
	</div>

	<back></back>
	<my-alert :show="alert.show" :content="alert.txt"></my-alert>
</template>

<script type="text/javascript">
	 import navCon from '../components/Nav'
	 import back from '../components/backTop'
	 import myAlert from '../components/myAlert'
	 import reply from '../components/replay'

	 export default {
	 	data() {
	 		let _this = this;
	 		return {
	 			topic: {},
	 			noDate: false,
	 			topicId: '',
	 			curReplyId: '',
	 			userId: localStorage.userId || '',
	 			alert: {
	 				txt: '',
          show: false,
          hideFn:function(){
              let timer;
              clearTimeout(timer);
              timer = setTimeout(function () {
                  _self.alert.show = false;
              }, 1000);
          }
	 			}
	 		};

	 	},
	 	route: {
	 		data (transition){
	 			let _this = this;
	 			_this.topicId = transition.to.params.id;

	 			$.get('/api/v1/topic/'+_this.topicId,function(d){
	 				if(d && d.data){
            _this.topic = d.data;
          }
          else{
            _this.noData = true;
          }
	 			});
	 		}
	 	},
	 	methods:{
	 		isUps (ups){
          let _self = this;
          return $.inArray(_self.userId,ups) >= 0;
      },
      addReply (id){
        this.curReplyId = id;
        let _self = this;
        if(!_self.userId){
            _self.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
        }
      },
      upReply (item){
      	let _self = this;
        if(!_self.userId){
          _self.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
        }
        else{
          $.ajax({
            type:'POST',
            url:'/api/v1/reply/'+item.id+'/ups',
            data:{accesstoken:localStorage.token},
            dataType: 'json',
            success:function(res){
                if(res.success){
                    if(res.action == "down"){
                        let index = $.inArray(_self.userId, item.ups);
                        item.ups.splice(index,1);
                    }
                    else{
                        item.ups.push(_self.userId);
                    }
                }
            },
            error:function(res){
                let error = JSON.parse(res.responseText);
                _self.alert.txt = error.error_msg;
                _self.alert.show = true;
                _self.alert.hideFn();
                return false;
            }
          });
        }
      }
	 	},
	 	components: {
      navCon,
      back,
      myAlert,
      reply
    }
	 }
</script>

<style type="text/css">
	*{
    border: 0;
    margin: 0;
    padding: 0;
	}
	.uped{
		color: #80bd01;
	}
	.page{
		padding-top: 50px;
    background-color: #fff;
    transition: all .3s ease;
    overflow-x: hidden;
	}
	.topic-title{
		padding: 5px;
    margin: 15px;
    font-size: 18px;
    color: #2c3e50;
    line-height: 1.5;
    background-color: #f0f0f0;
    border-radius: 5px;
	}
	.author-info{
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 15px;
    color: #34495e;
    font-size: 12px;
	}
	.author-info span,.author-info time{
    display: block;
    padding: 5px 0;
	 }
	.avatar{
		border:0;
		padding: 0;
		margin: 0;
		display: block;
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 50%;
	}
	.col{
		display: block;
    width: 100%;
    -webkit-flex: 1;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    flex: 1;
	}
	.author-info .right {
    text-align: right;
	}
	.topic-content{
    padding: 15px;
    margin-top: 15px;
    background: #ffffff;
    border-bottom: solid 1px #d4d4d4;
	}
	.markdown-body{
		-webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    word-wrap: break-word;
	}
	.topic-reply{
		color: #2c3e50;
    font-size: 16px;
    line-height: 1.5;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 15px;
    border-bottom: solid 1px #d4d4d4;
	}
	.topic-reply strong{
		color: #42b983;
	}
	.reply-list{
    width: 100%;
    margin-top: 15px;
	}
	.user{
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flexbox;
    display: flex;
    width: 100%;
    margin: 15px 0;
    padding: 0 10px;
	}
	.head{
    display: inline-block;
    width: 45px;
    height: 45px;
    border: 2px solid #fff6e6;
    border-radius: 50%;
    margin-right: 10px;
	}
	.info{
    display: block;
    flex: 1;
	}
	.cl{
    float: left;
    width: 70%;
	}
	.cl .name{
    display: block;
    color: #626262;
	}
	.cl .mt10{
    margin-top: 10px;
	}
	.cr{
		float: left;
    width: 30%;
    text-align: left;
	}
	.icon{
    font-size: 26px;
	}
	.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
	}
	.reply_content{
    padding: 0 15px;
    margin-bottom: 15px;
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
</style>