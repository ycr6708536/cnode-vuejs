<template>
	<nav-con page-type="发表" ></nav-con>
	<section class="add-container">
		<div class="line">选择分类：
      <select class="add-tab" v-model="topic.tab">
        <option value="share">分享</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
      </select>
      <a class="add-btn" @click="addTopic">发布</a>
    </div>
		<div class="line">
      <input class="add-title" v-model="topic.title"
              type="text" :class="{'err':err=='title'}"
              placeholder="标题，字数10字以上" max-length="100"/>
    </div>
    <textarea v-model="topic.content" rows="35" class="add-content"
            :class="{'err':err=='content'}"
            v-model="content"
            placeholder='回复支持Markdown语法,请注意标记代码'>
        </textarea>
	</section>
	<my-alert :show="alert.show" :content="alert.txt"></my-alert>
</template>

<script type="text/javascript">
	import navCon from '../components/Nav'
	import myAlert from '../components/myAlert'

	export default {
		data () {
			var _self = this;
			return {
				topic: {
          tab:'share',
          title:'',
          content:'',
          accesstoken:localStorage.token
        },
        err:'',
        authorTxt:'<br/><br/><a class="from" href="https://github.com/ycr6708536/cnode-vuejs">我是来自Vue的小尾巴</a>',
        alert: {
                    txt: '',
                    show: false,
                    hideFn:function(){
                        let timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            self.alert.show = false;
                        }, 1000);
                    }
                }
			};

		},
		methods:{
			addTopic () {
				let self = this,
					title  = self.topic.title.trim(),
					contents = self.topic.content.trim();
				if(!title || title.length < 0 ){
					self.err = 'title';
					return false;
				}
				if(!contents || contents.length < 0){
					self.err = 'content';
					return false;
				}

				self.topic.content += self.authorTxt;	
				$.ajax({
					type: 'post',
					url: '/api/v1/topics',
					data: self.topic,
					datatype: 'json',
					success: function (d){
						if(d.success){
							self.$route.router.go({name:'list'});
						}
					},
					error: function (d) {
						let error = JSON.parse(res.responseText);
            self.alert.txt = error.error_msg;
            self.alert.show = true;
            self.alert.hideFn();
            return false;
					}
				});
			}
		},
		components: {
			navCon,
			myAlert
		}
	}
</script>

<style type="text/css">
	*{
    border: 0;
    margin: 0;
    padding: 0;
	}
	.add-container{
    margin-top: 50px;
    background-color: #fff;
	}
	.line{
    padding: 10px 15px;
    border-bottom: solid 1px #d4d4d4;
	}
	.line .add-tab{
    display: inline-block;
    width: calc(100% - 140px);
    min-width: 50%;
    font-size: 16px;
    background: transparent;
	}
	.line .add-tilte{
    font-size: 16px;
    border: none;
    width: 100%;
    background: transparent;
    height: 25px;
	}
	.add-content{
    margin: 15px 2%;
    width: 96%;
    border-color: #d4d4d4;
    color: #000;
	}
	.err{
		border: 1px solid red;
	}
	.add-btn{
    color: #fff;
    background-color: #80bd01;
    padding: 5px 15px;
    border-radius: 5px;
	}
</style>