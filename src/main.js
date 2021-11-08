import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import VueI18n from 'vue-i18n'
import myEnLocale from './assets/lang/en'
import myZhLocale from './assets/lang/zh-cn'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

import '@/assets/icon/iconfont.css'
import axios from 'axios'
Vue.prototype.axios = axios;
Vue.use(ElementUI,{zhLocale});
Vue.use(VueI18n)
Vue.use(VueI18n)
const messages = {
  'en': Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}
const lang = localStorage.getItem('user-language') || 'zh-cn'
const i18n = new VueI18n({
  locale: lang,
  messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value))
Vue.config.productionTip = false

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
  i18n,
  render: h => h(App)
}).$mount('#app')
