// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from './router'
import ElementUI from 'element-ui'
import '@/theme/index.css'
import VueCookies from 'vue-cookies'      // 引入vue-cookie插件 api: https://github.com/alfhen/vue-cookie
import httpRequest from '@/utils/httpRequest' // 引入axios api: https://github.com/axios/axios


Vue.use(VueCookies)
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
