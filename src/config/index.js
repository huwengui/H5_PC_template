import projectAConfig from './project-a.js'
import projectBConfig from './project-b.js'

// 读取环境变量中的项目标识（默认使用project-a）
const projectName = process.env.VUE_APP_PROJECT || 'project-a'

let config
if (projectName === 'project-a') {
  config = projectAConfig
} else if (projectName === 'project-b') {
  config = projectBConfig
} else {
  // 默认使用project-a配置
  config = projectAConfig
}

// 导出配置
export default config
