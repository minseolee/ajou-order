const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://ajou-eats-api.seunglab.dev',
            changeOrigin: true,
            secure: true
        }),
    );
};
