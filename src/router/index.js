import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import VueResource from "vue-resource"
Vue.use(VueResource)


/*采用懒加载组件的方式，减少初始页面的负载*/
const login = resolve => require(['../pages/login'], resolve)//登录页面
const first = resolve => require(['../pages/main'], resolve)//首页
const foot = resolve => require(['../components/foot'], resolve)//底部组件
const inform = resolve => require(['../pages/newinform'], resolve)//新建通知
const group = resolve => require(['../pages/list'], resolve)//通讯录
const set = resolve => require(['../pages/set'], resolve)//设置页面
const adduser = resolve => require(['../pages/addUser'], resolve)//添加联系人
const addgroup = resolve => require(['../pages/addgroup'], resolve)//添加联系人
const choose = resolve => require(['../components/chooselist'], resolve)
const about = resolve => require(['../pages/about'], resolve)
const listen = resolve => require(['../pages/listen'], resolve)

Vue.use(Router)

export default new Router({
  	routes: [
	  {
	  	path: '/',
	  	name: 'login',
	  	component: login
	  },
	  {
	  	path: '/foot',
	  	component: foot
	  },
	  {
	  	path: '/first/:sign',
	  	name: 'first',
	  	component: first
	  },
	  {
	  	path: '/inform/:sign',
	  	name: 'inform',
	  	component: inform
	  },
	  {
	  	path: '/group/:sign',
	  	name: 'group',
	  	component: group
	  },
	  {
	  	path: '/set/:sign',
	  	name: 'set',
	  	component: set
	  },
	  {
	  	path: '/adduser/:sign',
	  	name: 'adduser',
	  	component: adduser
	  },
	  {
	  	path: '/addgroup/:sign',
	  	name: 'addgroup',
	  	component: addgroup
	  },
	  {
	  	path: '/about/:sign',
	  	name: 'about',
	  	component: about
	  },
	  {
	  	path: '/listen',
	  	component: listen
	  }
  ]
})
