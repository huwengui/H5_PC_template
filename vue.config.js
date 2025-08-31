const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// 从 src/config/index.js 读取配置
function getProjectConfig() {
  const projectName = process.env.VUE_APP_PROJECT || 'project-a'

  try {
    // 由于 vue.config.js 运行在 Node.js 环境，需要使用 CommonJS 方式读取
    // 这里我们直接读取配置文件并解析其中的配置数据
    const configPath = path.resolve(__dirname, 'src/config/index.js')

    // 读取配置文件内容
    const fs = require('fs')
    const configFileContent = fs.readFileSync(configPath, 'utf8')

    // 提取 PROJECT_CONFIGS 对象（使用正则匹配）
    const configMatch = configFileContent.match(
      /const PROJECT_CONFIGS = ({[\s\S]*?^})/m
    )
    if (!configMatch) {
      throw new Error('无法解析配置文件中的 PROJECT_CONFIGS')
    }

    // 使用 eval 执行配置对象（注意：这里是安全的，因为是我们自己的配置文件）
    const PROJECT_CONFIGS = eval(`(${configMatch[1]})`)

    const config = PROJECT_CONFIGS[projectName]

    if (!config) {
      console.warn(
        `⚠️  项目配置 "${projectName}" 不存在，使用默认配置 "project-a"`
      )
      return PROJECT_CONFIGS['project-a']
    }

    return config
  } catch (error) {
    console.error('❌ 读取项目配置失败，使用默认配置:', error.message)
    // 降级到默认配置
    return {
      baseurl: 'https://api.project-a.com',
      appName: '项目A',
    }
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-pxtorem')({
              rootValue: 75, // 设计稿宽度/10，如设计稿为750px，则设置为75
              propList: ['*'], // 需要转换的属性，*表示所有属性
              selectorBlackList: [], // 不需要转换的选择器
              minPixelValue: 2, // 小于2px的不转换
            }),
          ],
        },
      },
    },
  },
  publicPath: './', // 设置相对路径，便于部署

  // 开发服务器配置
  devServer: {
    port: 8080, // 开发服务器端口
    open: true, // 自动打开浏览器

    // API代理配置 - 动态根据项目配置
    proxy: (() => {
      const projectConfig = getProjectConfig()

      // 直接使用 baseurl 作为 API 代理地址
      const apiTarget = projectConfig.baseurl

      return {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
        '/test': {
          target: 'https://www.baidu.com', // 固定的第三方URL
          changeOrigin: true,
          pathRewrite: {
            '^/test': '',
          },
        },
      }
    })(),
  },
})
