import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/404', component: NotFound },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
