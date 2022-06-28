import { createApp } from './create-app.js'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();
        // 设置服务器端 router 的位置
        router.push(context.url)
        router.isReady().then(() => {
            const matchedRoutes = router.getRoutes();
            if (!matchedRoutes.length) {
                return reject({
                    code: 404
                });
            }
            Promise.all(matchedRoutes.map(router => router.components).map(Component => {
                if (Component.default.asyncData) {
                    return Component.default.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                // 状态传递给renderer的上下文，方便后面客户端激活数据
                context.state = store.state
                resolve(app)
            }).catch(reject);
        })
    })
}