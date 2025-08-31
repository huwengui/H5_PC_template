# H5/PC 通用 Vue 模板

一个基于 Vue 2 的响应式模板，支持移动端和PC端自适应，内置完整的开发工具链和常用功能模块。

## ✨ 特性

- 📱 **移动端优先** - 基于 lib-flexible + postcss-pxtorem 的完整移动端适配方案
- 💻 **PC端兼容** - 响应式设计，完美支持桌面端访问
- 🛠️ **开箱即用** - 内置 HTTP 请求、工具函数、设备检测等常用功能
- 🎨 **Element UI** - 集成 Element UI 组件库
- 📦 **模块化** - 清晰的项目结构，易于维护和扩展
- 🔧 **开发友好** - ESLint + Prettier 代码规范，完整的开发工具链

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run serve
```

### 生产构建
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

### 预览构建结果
```bash
# 全局安装 http-server
npm install -g http-server

# 构建项目
npm run build

# 启动静态服务器
http-server dist -p 8080 -o
```

## 📁 项目结构

```
src/
├── api/           # API 接口管理
│   └── index.js   # API 接口定义
├── assets/        # 静态资源
├── components/    # 公共组件
├── config/        # 配置文件
│   └── index.js   # 项目配置
├── css/           # 全局样式
│   └── base.css   # 基础样式和工具类
├── router/        # 路由配置
├── store/         # Vuex 状态管理
├── utils/         # 工具函数
│   ├── index.js   # 工具函数集合
│   └── request.js # HTTP 请求封装
├── views/         # 页面组件
├── App.vue        # 根组件
└── main.js        # 入口文件
```

## 🔧 核心功能

### 移动端适配

- **lib-flexible**: 动态设置 rem 基准值
- **postcss-pxtorem**: 自动将 px 转换为 rem
- **设计稿基准**: 750px 设计稿（rootValue: 75）
- **1px 边框解决方案**: 解决移动端 1px 边框显示问题

### 响应式设计

- **断点设置**: 768px 作为移动端/PC端分界点
- **Flexbox 布局**: 提供完整的 flex 布局工具类
- **媒体查询**: 关键组件支持响应式布局

### 设备检测

```javascript
// 使用设备检测工具
this.$utils.deviceUtils.isMobile()    // 是否为移动设备
this.$utils.deviceUtils.isIOS()       // 是否为 iOS
this.$utils.deviceUtils.isAndroid()   // 是否为 Android
this.$utils.deviceUtils.getBrowserInfo() // 获取浏览器信息
```

### HTTP 请求

```javascript
// 使用封装的 API
this.$api.get('/user/info')
this.$api.post('/user/login', { username, password })
```

### 工具函数

```javascript
// 常用工具函数
this.$utils.formatDate(date)          // 日期格式化
this.$utils.debounce(fn, delay)       // 防抖
this.$utils.throttle(fn, delay)       // 节流
this.$utils.deepClone(obj)            // 深拷贝
```

## ⚙️ 配置说明

### 环境配置

- `.env` - 通用环境变量
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

### Vue 配置

`vue.config.js` 包含：
- postcss-pxtorem 配置
- 开发服务器配置
- 构建优化配置

### 代理配置

开发环境支持 API 代理，在 `vue.config.js` 中配置：

```javascript
devServer: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

## 🎨 样式规范

### CSS 工具类

```css
/* 布局 */
.flex          /* display: flex */
.flex-center   /* 居中对齐 */
.flex-between  /* 两端对齐 */
.flex-column   /* 垂直布局 */

/* 文本对齐 */
.text-left     /* 左对齐 */
.text-center   /* 居中对齐 */
.text-right    /* 右对齐 */

/* 浮动和清除 */
.fl            /* float: left */
.fr            /* float: right */
.clearfix      /* 清除浮动 */
```

### 1px 边框

```css
.border-1px {
  position: relative;
}
.border-1px::after {
  /* 1px 边框实现 */
}
```

## 📱 兼容性

- **移动端**: iOS 9+, Android 5+
- **PC端**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **响应式**: 支持 320px - 1920px 屏幕宽度

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [Vue.js 官方文档](https://vuejs.org/)
- [Element UI 文档](https://element.eleme.io/)
- [lib-flexible](https://github.com/amfe/lib-flexible)
- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)
2. 按照迁移指南操作：`MIGRATION_GUIDE.md`
