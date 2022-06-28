# vue3 ssr 学习版

基于 https://github.com/yacan8/blog/issues/30 实现的vue3版本的ssr, 当然更好还是使用nuxt, 主要以学习为主
建议阅读完上述文章和它的参考文献再看代码实现

## 跟 vue2 不同的地方
- vue-server-renderer -> vue-bundle-renderer [如果还想用bundle的形式加载app]
- vue-server-renderer renderToString -> @vue/server-renderer renderToString [vue3将renderToString内置在server-renderer]
- new Vue -> createSSRApp [vue3 语法]
- new Router mode: history -> 
    ``` createRouter({
            history: process.browser
            ? createWebHistory()    // 客户端单页面路由
            : createMemoryHistory(), // 服务端路由，将请求到后端的地址拿到后再跳转
            routes
        })
    ```
- css由可以在服务端render的时候，将style注入到context.styles，变为利用客户端extract的css来加载

## 命令相关
``` server ```: 可以在server.js加代码查看实现
``` server:debug ```: 在vscode debug script能看发生了些什么
``` build ```: 客户端打包
``` build:server ```: 服务器打包