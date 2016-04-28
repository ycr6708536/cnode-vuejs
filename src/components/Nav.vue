<template>
	<div class="nav">
		<div class="nav-left">
			CNode
		</div>
		<div class="nav-right" @click="showDownMenu">
			<i class="fa fa-large fa-bars" :class="{'fa-bars':!showMenu,'fa-close':showMenu}"></i>
		</div>
		<span class="nav-title" >{{pageType}}</span>
		<ul class="nav-list" v-show="showMenu" @click="showDownMenu">
			<li v-link="{ name: 'list', query: { tab: 'all'}}"><i class="fa fa-large fa-bars fa-fw"></i><span>全部</span></li>
			<li v-link="{ name: 'list', query: { tab: 'good'}}"><i class="fa fa-large fa-fire fa-fw"></i><span>精华</span></li>
			<li v-link="{ name: 'list', query: { tab: 'share'}}"><i class="fa fa-large fa-share fa-fw"></i><span>分享</span></li>
			<li v-link="{ name: 'list', query: { tab: 'ask'}}"><i class="fa fa-large fa-weixin fa-fw"></i><span>问答</span></li>
			<li v-link="{ name: 'list', query: { tab: 'job'}}"><i class="fa fa-large fa-users fa-fw"></i><span>招聘</span></li>
			<li @click="toggleMan"><i class="fa fa-large fa-user fa-fw"></i><span>个人</span></li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import utils from '../lib/utils'       //加载公用函数

	export default{
	  props: ['pageType'],
	  el: '.nav',
	  data () {
			return {
				showMenu: false
			}
		},
		methods: {
			showDownMenu () {
				this.showMenu = !this.showMenu
			},
			toggleMan () {
				this.showDownMenu()
				if(!!localStorage.loginName){
					this.$route.router.go({name:'user',params: { username: localStorage.username }})
				}else{
					this.$route.router.go({name:'login',params: { redirect: encodeURIComponent(this.$route.path)}})
				}
			}
	  }
	}
</script>

<style type="text/css">
	.nav{
		height: 50px;
		background: #444;
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
	}
	.nav-left{
		margin: 10px;
		line-height: 30px;
		float: left;
		color: #FFF;

	}
	.nav-right{
		float: right;
		padding: 10px;
		color: #fff;
		line-height: 30px;
	}
	.nav-title{
		position: absolute;
    margin: 0 auto;
    width: 200px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    color: #FFF;
	}
	.nav-list{
    padding: 10px;
    margin: 0;
    position: absolute;
    right: 2px;
    top: 50px;
    height: auto;
    width: 80px;
    background-color: #444;
    z-index: 1;
    border: 1px solid #ccc;
    border-radius: 0 0 5px 5px;
    color: #FFF;
	}
	.nav-list li span{
		margin-left: 5px;
	}
</style>