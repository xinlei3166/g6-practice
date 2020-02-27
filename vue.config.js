const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false, // 打包去掉map
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css', 'less'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    }
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  // lintOnSave: true,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    disableHostCheck: true // 允许本地host域名访问
    // proxy: {
    //   '^/news': {
    //     target: 'https://ccc.com',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/news': '/news'
    //     }
    //   }
    // }
  }
}
