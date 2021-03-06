/*
 * @Author: lzd
 * @Date: 2020-09-04 08:54:44
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-11 17:25:22
 * @Description: content description
 */
const path = require("path"); //引入path模块
module.exports = {
  outputDir: path.resolve(__dirname, "dist/"),
  assetsDir: "static",
  configureWebpack: {
    // output: {
    //   path: path.resolve(__dirname, 'dist/'),
    //   publicPath: "/static/"
    // },
    resolve: {
      alias: {
        "@api": path.resolve(__dirname, "src/api"),
        "@plugins": path.resolve(__dirname, "src/plugins"),
        "@config": path.resolve(__dirname, "src/config"),
        "@assets": path.resolve(__dirname, "src/assets")
      }
    },
    externals: {
      BMap: "BMap",
      BMap_Symbol_SHAPE_POINT: "BMap_Symbol_SHAPE_POINT"
    }
  },
  pluginOptions: {
    moment: {
      locales: [""]
    },
    htmlWebpackPlugin: {
      title: "EPM管理系统"
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "EPM管理系统",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/main.js'
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://192.168.0.146:24684", //目标地址
        ws: false, //// 是否启用websockets
        secure: false, //是否使用https加密 如果后台是非安全证书，关闭加密
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { "^/api": "" } //这里重写路径
      },
      "/ws": {
        target: "ws://10.129.41.91:7090", //目标地址  使用时 baseUrl = "ws://" + location.host + "/ws"; 加上本地服务器网址
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { "^/ws": "" } //这里重写路径
      }
    }
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: {

  //       }
  //     },
  //   }
  // },
  transpileDependencies: ["vue-echarts", "resize-detector"]
};
