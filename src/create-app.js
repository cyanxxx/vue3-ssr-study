// app.js (在服务器和客户端之间共享)
import { createSSRApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'
import createRouter from './createRouter';
import createStore from './store';

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const store = createStore()
 
  app.use(router)
  app.provide('store', store)
  return { app, router, store }
}