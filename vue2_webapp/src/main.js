// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
Vue.prototype.$http = axios;

import Vuex from 'vuex'
Vue.use(Vuex)

import messages from "@/locale/message.js"
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh',
    messages
})

//动态更改title
Vue.use(require('vue-wechat-title'))

//用到的时候需要安装
//import Mint from 'mint-ui'
//import 'mint-ui/lib/style.css'
//Vue.use(Mint)

//用到的时候需要安装
//import Vant from 'vant';
//import 'vant/lib/vant-css/index.css';
//Vue.use(Vant);

import '@/mock/index.js'
import '@/assets/css/app.scss'
import store from '@/store/index.js'

import utils from '@/assets/js/utils.js'
Vue.prototype.$utils = utils;

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>',
    beforeCreate(){
        var self = this;
        self.$utils.setRem()
    }
})
