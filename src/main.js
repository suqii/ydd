import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import '@/assets/icon/iconfont.css'
import axios from 'axios'
Vue.prototype.axios = axios;

// const axiosInstance = axios.create({
//   // baseURL: 'http://47.108.192.147:3000',
//   baseURL: 'http://localhost:3000',
// })
// Vue.prototype.axios = axiosInstance;

Vue.filter('setWH',(url , arg)=>{
    return url.replace(/w\.h/,arg);
});

import Scroller from '@/components/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
