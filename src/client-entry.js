// client.js
import { createApp } from './create-app.js'

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  // 激活状态数据
  store.replaceState(window.__INITIAL_STATE__);
}
// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
    app.mount('#app')
  })