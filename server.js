const express = require('express');
const path = require('path');
const app = express();
const bundleRunner = require('bundle-runner')
const serverBundle = path.resolve(process.cwd(), 'serverDist', 'vue-ssr-server-bundle.json');
const { createBundleRenderer } = require('vue-bundle-renderer');
const { renderToString } = require('@vue/server-renderer');
const clientManifestPath = path.resolve(process.cwd(), 'dist', 'vue-ssr-client-manifest.json');
const clientManifest = require(clientManifestPath);

const renderer = createBundleRenderer(serverBundle, {
    clientManifest,
    renderToString: async (input, context) => {
      const html = await renderToString(input, context)
      return `<div id="app">${html}</div>`
    },
    bundleRunner // 将客户端的构建结果清单传入
});
function generateHtml(params) {
    return `<!DOCTYPE html>
    <html ${params.HTML_ATTRS}>
    <head ${params.HEAD_ATTRS}>
      ${params.HEAD}
    </head>
    <body ${params.BODY_ATTRS}>
      ${params.APP}
    </body>
    </html>`
}
/* code todo 实例化渲染器renderer */
app.use(express.static(path.resolve(process.cwd(), 'dist')));
app.get('*', function(req, res) {
    const context = {
        url: req.url,
        // __VUE_SSR_CONTEXT__: global.__VUE_SSR_CONTEXT__ = {}  // 仅测试，确认__inject__没有被调用
    };
    renderer.renderToString(context).then(rendered => {
        console.log(context)
        const state = `<script>window.__INITIAL_STATE__=${JSON.stringify(context['state'])}</script>`
        // console.log('global', global.styles)
        // console.log('this', this.styles)
        // console.log(renderer.rendererContext)
        //  参考 https://github.com/nuxt/framework/blob/7efdb486dbe65382b6293e28c70ab6348bb4a874/packages/nuxt/src/core/runtime/nitro/renderer.ts
        const html = generateHtml({
            HTML_ATTRS: (rendered.meta?.htmlAttrs || ''),
            HEAD_ATTRS: (rendered.meta?.headAttrs || ''),
            HEAD: (rendered.meta?.headTags || '') +
              rendered.renderResourceHints() + rendered.renderStyles() + (context.__VUE_SSR_CONTEXT__?.styles || ''),
            BODY_ATTRS: (rendered.meta?.bodyAttrs || ''),
            APP: (rendered.meta?.bodyScriptsPrepend || '') + rendered.html + state + rendered.renderScripts() + (rendered.meta?.bodyScripts || '')
          })
        res.send(html)
    })
});

app.listen(3001, function() {
    console.log('listen:3001');
});