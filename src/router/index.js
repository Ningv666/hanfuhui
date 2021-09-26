import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Usermain from '../views/Usermain'
import Activity from '../views/Activity'
import Study from '../views/Study'
import Usercenter from '../views/Usercenter'
import AddArticle from '../views/AddArticle'
import ShowTopics from '../views/ShowTopics'
import StudyDetails from '../views/StudyDetails'
import ShowDetails from '../views/ShowDetails'
import ArticleDetails from '../views/ArticleDetails'
import CenterInfo from '../views/CenterInfo'
import Search from '../views/Search'
import Login from '../views/Login'
import Res from '../components/Res'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Usermain',
    component: Usermain,
	redirect:'/user'

  },
  {
    path: '/search/:type',
    name: 'Search',
    component: () => import(
      /* webpackChunkName: "search" */ 
      '../views/Search.vue'),
      props:true
  },
  {
    path: '/centerinfo/:option',
    name: 'CenterInfo',
    component: () => import(
      /* webpackChunkName: "centerinfo" */ 
      '../views/CenterInfo.vue'),
      props:true
  },
  {
    path: '/studydetails/:sid',
    name: 'StudyDetails',
    component: () => import(
      /* webpackChunkName: "studydetails" */ 
      '../views/StudyDetails.vue'),
      props:true
  },
  {
    path: '/showdetails/:ssid',
    name: 'ShowDetails',
    component: () => import(
      /* webpackChunkName: "showdetails" */ 
      '../views/ShowDetails.vue'),
      props:true
  },
  {
    path: '/articledetails/:aid',
    name: 'ArticleDetails',
    component: () => import(
      /* webpackChunkName: "articledetails" */ 
      '../views/ArticleDetails.vue'),
      props:true
  },
  {
    path: '/res',
    name: 'Res',
    component: Res
  },
  {
    path: '/login',
    name: 'Login',
    component: Login

  },
  {
    path: '/showtopics',
    name: 'ShowTopics',
    component: () => import(
      /* webpackChunkName: "showTopics" */ 
      '../views/ShowTopics.vue')
  },
  {
    path: '/add',
    name: 'AddArticle',
    component: () => import(
      /* webpackChunkName: "addArticle" */ 
      '../views/AddArticle.vue')
  },
  {
    path: '/center',
    name: 'Usercenter',
    component: () => import(
      /* webpackChunkName: "usercenter" */ 
      '../views/Usercenter.vue')
  },
  {
    path: '/study',
    name: 'Study',
    component: () => import(
      /* webpackChunkName: "study" */ 
      '../views/Study.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import(
      /* webpackChunkName: "activity" */ 
      '../views/Activity.vue')
    
  },
  {
    path: '/user',
    name: 'Usermain',
    component: () => import(
      /* webpackChunkName: "usermain" */ 
      '../views/Usermain.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
