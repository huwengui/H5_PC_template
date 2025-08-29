# template

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目配置

### API代理配置

项目支持多种API代理配置方式，详细说明请查看 [PROXY_CONFIG.md](./PROXY_CONFIG.md)。

### API配置优化方案

为了简化API配置管理，项目提供了优化的配置方案：

- **📋 [API优化指南](./API_OPTIMIZATION_GUIDE.md)** - 详细的优化方案说明
- **🚀 [迁移指南](./MIGRATION_GUIDE.md)** - 从当前配置迁移到优化配置的步骤


#### 优化方案特点

- ✅ **集中管理** - 所有API配置集中在 `src/config/api.config.js`
- ✅ **自动化** - 新增服务只需修改一个配置文件
- ✅ **易维护** - 配置变更影响范围小，维护成本低
- ✅ **类型安全** - 更好的开发体验和错误提示
- ✅ **环境隔离** - 开发和生产环境配置完全分离

#### 快速开始优化配置

1. 查看优化方案：`API_OPTIMIZATION_GUIDE.md`
2. 按照迁移指南操作：`MIGRATION_GUIDE.md`
