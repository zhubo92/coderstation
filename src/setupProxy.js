const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/res", {
            target: "http://120.26.76.192",
            changeOrigin: true
        }),
        createProxyMiddleware("/api", {
            target: "http://120.26.76.192",
            changeOrigin: true
        }),
        createProxyMiddleware("/static", {
            target: "http://120.26.76.192",
            changeOrigin: true
        })
    )
}