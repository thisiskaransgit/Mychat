import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { auth } from '../firebase'
import { component } from 'vue/types/umd'

const routes = [
    {
        path: '/',
        name: '../views/Home.vue',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/sign-in',
        name: "SignIn",
        component: () => import('../views/Signin.vue')
    },
    {
        path:'/register',
        name:'register',
        component:() => import('../views/register.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' && auth.currentUser) {
        next('/')
        return;
    }

    if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
        next('/login')
        return;
    }

    next();
})

export default router
