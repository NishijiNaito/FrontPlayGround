import HostViewVue from '@/views/HostView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import PlayViewVue from '../views/PlayView.vue'
import DebugView from '../views/DebugView.vue'
import SpecViewVue from '@/views/SpecView.vue'

const routes = [{
    path: '/start',
    name: 'start',
    component: StartView
}, {
    path: '/host',
    name: 'host',
    component: HostViewVue
}, {
    path: '/play',
    name: 'play',
    component: PlayViewVue
},
{
    path: '/debug',
    name: 'debug',
    component: DebugView
},
{
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
}, {
    path: '/spectator',
    children: [{
        path: '',
        redirect: '/start'
    },
    {
        path: ':roomId',
        name: "spectator",
        component: SpecViewVue,
        props: true
    }
    ]
}

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router