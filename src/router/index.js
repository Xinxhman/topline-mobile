import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirective: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {

      path: '/',
      component: () => import('@/views/layoutbar'),
      children: [
        {
          name: 'home',
          path: '/home',
          component: () => import('@/views/home')
        }
      ]
    }
  ]
})
