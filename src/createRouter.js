import { createRouter as _createRouter, createMemoryHistory, createWebHistory }  from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/about',
    name: 'About',
    component: About
}];
export default function createRouter() {
    return _createRouter({
        history: process.browser
        ? createWebHistory()
        : createMemoryHistory(),
        routes
    })
}