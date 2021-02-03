import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/view/main'
import MallMain from '@/view/mall-main'
import Login from '@/view/components/login'
import Order from '@/view/components/order'
import Cart from '@/view/components/cart'
import Home from '@/view/components/home'
import Mall_1 from '@/view/components/mall-1'
import Mall_2 from '@/view/components/mall-2'
import Mall_3 from '@/view/components/mall-3'
import Mall_4 from '@/view/components/mall-4'
import Mall_5 from '@/view/components/mall-5'
import Mall_6 from '@/view/components/mall-6'
import Mall_7 from '@/view/components/mall-7'


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
      beforeEnter (to, from, next) {
        let token = Vue.$cookies.get('token')
        if (!token || !/\S/.test(token)) {
          Vue.$cookies.remove('token')
          this.store.commit('resetStore')
          next({ name: 'login' })
        }
        next()
      },
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'mall-main',
          component: MallMain,
          children: [
            {
              path: '/home',
              name: 'home',
              component: Home,
            },
            {
              path: '/',
              name: 'home',
              component: Home,
            },
            {
              path: '/mall-1',
              name: 'mall-1',
              component: Mall_1,
            },
            {
              path: '/mall-2',
              name: 'mall-2',
              component: Mall_2,
            },
            {
              path: '/mall-3',
              name: 'mall-3',
              component: Mall_3,
            },
            {
              path: '/mall-4',
              name: 'mall-4',
              component: Mall_4,
            },
            {
              path: '/mall-5',
              name: 'mall-5',
              component: Mall_5,
            },            {
              path: '/mall-6',
              name: 'mall-6',
              component: Mall_6,
            },
            {
              path: '/mall-7',
              name: 'mall-7',
              component: Mall_7,
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
