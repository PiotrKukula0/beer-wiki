import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import NotFound from './pages/NotFound.vue'
import BeerList from './components/BeerList.vue'
import BeerDetails from './components/BeerDetails.vue'

const routes = [
    { path: '/', redirect: '/beers' },
    { path: '/404', component: NotFound },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
    { path: '/beers', component: BeerList },
    { path: '/beers/:id', component: BeerDetails },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
