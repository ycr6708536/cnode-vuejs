<template>
	<section class="reply">
		<textarea id="content" rows="8" class="text" 
		:class="{'err':hasError}" 
		@change="validate" 
		v-model="content"
		placeholder="回复支持Markdown语法,请注意标记代码"></textarea>
	</section>
	<a class="button2" @click="addReply">确定</a>
</template>

<script type="text/javascript">
	let utils = require('../lib/utils')
	let  markdown = require('markdown')

	export default {
		replace:true,
		props: ['topic','replyId','topicId','replyTo','show'],
		data (){
			return {
				hasError:false,
				content:'',
				userId:localStorage.userId || '',
				authorTxt:'<br/><br/><a class="form" href="https://github.com/ycr6708536/cnode-vuejs">我是来自Vue的小尾巴</a>',
			};
		},
		ready (){
			var _self = this;
			if(_self.replyTo){
				_self.content = '@'+_self.replyTo+' ';
			}
		},
		methods:{
			validate () {
				if(this.content){
					this.hasError = false;
				}
			},
			addReply () {
				let _self = this;

				if(!_self.content){
					_self.hasError = true;
				}else{
					let time=new Date()
            , linkUsers =  utils.linkUsers(_self.content)
            , htmlText = markdown.parse(linkUsers) + _self.authorTxt
            , reply_content =$('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML
            , postData={accesstoken:localStorage.token,content: _self.content+ _self.authorTxt};
          if(_self.replyId){
            postData.reply_id = _self.replyId;
          }

          $.ajax({
          	url:'/api/v1/topic/'+_self.topicId+'/replies',
          	data: postData,
          	type: 'post',
          	datatype: 'json',
          	success:function(res){
              if(res.success){
                _self.topic.replies.push({
                  id:res.reply_id,
                  author:{
                    loginname:_self.userId,
                    avatar_url:localStorage.avatar_url
                  },
                  content:reply_content,
                  ups:[],
                  create_at:time
                });
              }
              _self.content = '';
              if(_self.show){
                  _self.show = '';
              }
            },
            error:function(res){
              var error = JSON.parse(res.responseText);
              _self.alert.txt = error.error_msg;
              _self.alert.show = true;
              _self.alert.hideFn();
              return false;
            }
          });

				}


			},
		}
	}
	
</script>

<style type="text/css">
	.reply{
    margin: 0 15px;
	}
	.text{
    display: block;
    -webkit-box-flex: 1;
    width: 100%;
    border: 1px solid #d5dbdb;
    background-color: #fff;
    font-size: 14px;
    padding: 15px;
    color: #313131;
    resize: none;
    -webkit-appearance: none;
	}
	.button2{
		display: inline-block;
    width: 100%;
    height: 42px;
    margin: 15px 0;
    line-height: 42px;
    color: #fff;
    font-size: 16px;
    background-color: #4fc08d;
    border: none;
    border-bottom: 2px solid #3aa373;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
	}
	.err{
		border: 1px solid red;
	}
</style>