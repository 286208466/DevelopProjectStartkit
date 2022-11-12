import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Layout from '@/components/layout';
Vue.use(Router)

let router = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/404',
            component: () => import('@/components/404'),
            hidden: true
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            hidden: true
        },
        {
            path: '',
            component: Layout,
            redirect: 'login',
            children: [{
                path: 'dashboard',
                hidden: true,
                component: () => import ('@/components/dashboard'),
                name: 'dashboard',
                meta: { title: 'dashboard', icon: '', nocache: true }
            }]
        },
        {
            path: '/system',
            component: Layout,
            children: [
                {
                    path: 'user',
                    component: () =>
                        import ('@/components/system/user'),
                    name: 'systemUser',
                    meta: { title: 'user', icon: '', nocache: true }
                },
                {
                    path: 'role',
                    component: () =>
                        import ('@/components/system/role'),
                    name: 'systemRole',
                    meta: { title: 'role', icon: '', nocache: true }
                },
                {
                    path: 'log',
                    component: () =>
                        import ('@/components/system/log'),
                    name: 'systemLog',
                    meta: { title: 'log', icon: '', nocache: true }
                }
            ]
        },
        { path: '*', redirect: '/404', hidden: true }
    ]
})

/*router.beforeEach((to, from, next) => {
	if(to.path.startsWith('/login')){
		window.localStorage.removeItem('token');
		next()
	}else{
		let token = JSON.parse(window.localStorage.getItem('token'))
		if(!token){
			next({path: '/login'})
		}else{
			next()
		}
	}
})*/

export default router
