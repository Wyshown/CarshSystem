// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        // target: 'http://www.gouchehui.com/cashsysback.php/',
        target: 'http://test3.gouchehui.com:8082/cashsysback.php/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/upload': {
        target: 'http://test3.gouchehui.com:8082/',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': '/'
        }
      }
    },
    cssSourceMap: false
  }
}
