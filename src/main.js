import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import List from './views/List'
import Login from './views/login'
import User from './views/user'
import Topic from './views/topics'
import Add from './views/add'
import filters from './filters'
import FastClick from 'fastclick'

Vue.use(VueRouter)
Vue.use(VueResource)

let App = Vue.extend({})
//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// 初始化路由
let router = new VueRouter({
    hashbang: true,
		history: true,
		saveScrollPosition: true,
		transitionOnLoad: true
})

router.beforeEach(transition => {
    //处理左侧滚动不影响右边
    $("html, body, #page").removeClass("scroll-hide");
    FastClick.attach(document.body);

    if (transition.to.auth) {
        if (localStorage.userId) {
            transition.next();
        } else {
            var redirect = encodeURIComponent(transition.to.path);
            transition.redirect('/list?redirect=' + redirect); //做了登录在修改应该是登录
        }
    } else {
        transition.next();
    }
})

router.map({
	'/':{
		name: 'list',
    component: List
	},
  '/list': {
  	name: 'list',
    component: List
  },
  '/login':{
  	name: 'login',
  	component: Login
  },
  '/user/:loginname':{
    name: 'user',
    component: User,
    auth: true
  },
  '/topic/:id':{
    name: 'topic',
    component: Topic,
    auth: true
  },
  '/add':{
  	name:'add',
  	component: Add,
  	auth: true
  }
 
 
})

/* eslint-disable no-new */

router.start(App, '#app')
