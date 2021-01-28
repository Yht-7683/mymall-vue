import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/view/main'
import MallMain from '@/view/mall-main'
import Login from '@/view/components/login'
import Order from '@/view/components/order'
import Cart from '@/view/components/cart'
import Home from '@/view/components/home'
import Mall_1 from '@/view/components/mall-1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      beforeEnter (to, from, next) {
        let token = Vue.$cookies.get('token')
        if (!token || !/\S/.test(token)) {
          Vue.$cookies.remove('token')
          this.store.commit('resetStore')
          next({ name: 'login' })
        }
        next()
      },
      children: [
        {
          path: '/',
          name: 'mall-main',
          component: MallMain,
          children: [
            {
              path: '/',
              name: 'home',
              component: Home,
            },
            {
              path: '/home',
              name: 'home',
              component: Home,
            },
            {
              path: '/mall-1',
              name: 'mall-1',
              component: Mall_1,
            }
          ]
        },
        {
          path: '/order',
          name: 'order',
          component: Order,
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
        }
      ]
    },
  ]
})
