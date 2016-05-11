<template>
	<nav-con :page-type="searchKey.tab | getTitleStr" ></nav-con>
	<ul class="post-list" >
		<li v-for="item in items" v-link="{name: 'topic',params: {id: item.id}}">
			<h3 v-text="item.title" 
					:class="item.tab | getTabClassName item.good item.top"
					:title="item.tab | getTabStr item.good item.top"></h3>
			<div class="content">
				<img class="avatar" :src="item.author.avatar_url">
				<div class="info">
					<p>
						<span class="author" v-text="item.author.loginname"></span>
						<span class="status" v-if="item.reply_count > 0"><b  v-text="item.reply_count"></b>/{{item.visit_count}}</span>
					</p>
					<p>
						<time class="create" v-text="item.create_at | getLastTimeStr true"></time>
						<time  v-text="item.last_reply_at | getLastTimeStr true"></time>
					</p>
				</div>
			</div>
		</li>
	</ul>
	<to-top></to-top>
</template>

<script type="text/javascript">
	import navCon from '../components/Nav'
	import toTop from '../components/backTop'

	export default {
		el: '.post-list',
		data () {
			return {
				items: [],
				searchKey:{
          page:1,
          limit:10,
          tab:'all',
          mdrender:true
        },
        scroll:true
			}
		},
		route: {
			data (transition) {
				let query = transition.to.query,tab = query.tab || 'all';
				
				this.searchKey.tab = tab;
				this.getItems(this.searchKey);

				window.onscroll = () => {
					 this.getScrollData();
				};
				// $(window).on('scroll', () => {
    //         this.getScrollData();
    //     });
			},
		},
		methods: {
			getItems (searchKey) {
				this.$http({
					url: '/api/v1/topics',
					data: searchKey,
					method: 'GET'
				}).then((response) => {
					this.scroll = true;
					this.items = response.data.data;
				}).error((data,status,request) => {
					console.log('fail' + status + "," + request);
				})
			},
			getScrollData () {
				if(this.scroll){
					let _body= document.body;
					if(window.screen.availHeight + _body.scrollTop >= _body.scrollHeight){
						this.scroll = false;
						this.searchKey.limit += 10;
						this.getItems(this.searchKey);
					}
				}
			}
		},
		components: {
			navCon,
			toTop
		}
	}
</script>

<style type="text/css">
	.post-list{
		background: #FFF;
		margin-top: 50px;
		padding: 0;
	}
	.post-list li{
		padding: 10px 15px;
		border-bottom: 1px solid #d5dbdb;
	}
	.post-list h3{
		color: #2c3e50;
		white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
	}
	.post-list h3:before{
		content: attr(title);
    margin-right: 10px;
    margin-top: -3px;
    color: #ffffff;
    padding: 5px 6px;
    font-size: 10px;
    font-weight: 400;
    border-radius: 4px;
    background-color: #e7e7e7;
    text-align: center;
    vertical-align: middle;

	}
	.post-list h3.top:before{
		background: #E74C3C;
	}
	.post-list h3.ask:before{
		background: #3498DB;
	}
	.post-list h3.share:before{
		background: #1ABC9C;
	}
	.post-list h3.good:before{
		background: #E67E22;
	}
	.post-list h3.job:before{
		background: #9B59B6;
	}
	.content{
		padding-top: 10px;
	}
	.avatar{
		display: block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border: 1px solid #F3F3F3;
    border-radius: 10px;
	}
	.info{
    display: block;
    width: 100%;
    -webkit-flex: 1;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    flex: 1;
	}
	.post-list p{
    padding: 3px 0;
		color: #34495e;
		font-size: 12px;
	}
	.post-list p:first-child{
		font-size: 14px;
	}
	.post-list p b{
		color: #42b983;
	}
	.display-flex, .post-list .content, .post-list p, .author-info{
		display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flexbox;
    display: flex;
	}
	.author{
    display: block;
    width: 100%;
    -webkit-flex: 1;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    flex: 1;
	}
	.create{
		display: block;
    width: 100%;
    -webkit-flex: 1;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    flex: 1;
	}
</style>