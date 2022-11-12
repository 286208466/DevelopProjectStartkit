import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '@/components/home.vue'
import login from '@/components/login.vue'


export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                title: '首页' //动态改变title
            },
            component: home
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登陆'
            },
            component: login
        }
    ]
})
