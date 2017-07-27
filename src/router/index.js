import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import VueResource from "vue-resource"
Vue.use(VueResource)

import login from '../pages/login'
import foot from '../components/foot'
import first from '../pages/first'
import inform from '../pages/inform'
import group from '../pages/group'

Vue.use(Router)

export default new Router({
  routes: [
	  {
	  	path: '/',
	  	component: login
	  },
	  {
	  	path: '/foot',
	  	component: foot
	  },
	  {
	  	path: '/first',
	  	component: first
	  },
	  {
	  	path: '/inform',
	  	component: inform
	  },
	  {
	  	path: '/group',
	  	component: group
	  }
  ]
})
