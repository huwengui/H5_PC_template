const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require("postcss-pxtorem")({
              rootValue: 75, // 设计稿宽度/10，如设计稿为750px，则设置为75
              propList: ["*"], // 需要转换的属性，*表示所有属性
              selectorBlackList: [], // 不需要转换的选择器
              minPixelValue: 2, // 小于2px的不转换
            }),
          ],
        },
      },
    },
  },
  publicPath: "./", // 设置相对路径，便于部署

  // 开发服务器配置
  devServer: {
    port: 8080, // 开发服务器端口
    open: true, // 自动打开浏览器

    // API代理配置
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
});
