import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Preview from '@/page/Preview'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: 'preview',
      name: 'preview',
      component: Preview
    },

  ]
})
