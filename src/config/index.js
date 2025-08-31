/**
 * 项目配置文件
 * @description 统一管理所有项目的配置信息
 * @author Vue项目模板
 * @version 1.0.0
 */

// 项目配置注册表
const PROJECT_CONFIGS = {
  'project-a': {
    // 接口基础地址
    baseurl: 'https://api.project-a.com',
    // 图片资源地址
    image_base_url: 'https://img.project-a.com',
    // WebSocket地址
    wss_url: 'wss://ws.project-a.com',
    // 项目特有参数
    appName: '项目A',
    themeColor: '#1890ff',
  },

  'project-b': {
    // 接口基础地址
    baseurl: 'https://api.project-b.com',
    // 图片资源地址
    image_base_url: 'https://img.project-b.com',
    // WebSocket地址
    wss_url: 'wss://ws.project-b.com',
    // 项目特有参数
    appName: '项目B',
    themeColor: '#52c41a',
  },

  // 🔧 新增项目只需要在这里添加配置即可
  // 'project-c': {
  //   baseurl: 'https://api.project-c.com',
  //   image_base_url: 'https://img.project-c.com',
  //   wss_url: 'wss://ws.project-c.com',
  //   appName: '项目C',
  //   themeColor: '#722ed1',
  // }
}

/**
 * 获取当前项目配置
 * @param {string} projectName - 项目名称
 * @returns {Object} 项目配置对象
 */
export function getProjectConfig(projectName) {
  const name = projectName || process.env.VUE_APP_PROJECT || 'project-a'
  const config = PROJECT_CONFIGS[name]

  if (!config) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️  项目配置 "${name}" 不存在，使用默认配置 "project-a"`)
    }
    return PROJECT_CONFIGS['project-a']
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 当前项目: ${name} (${config.appName})`)
  }
  return config
}

/**
 * 获取所有项目配置
 * @returns {Object} 所有项目配置
 */
export function getAllProjectConfigs() {
  return PROJECT_CONFIGS
}

/**
 * 获取项目列表
 * @returns {Array} 项目名称数组
 */
export function getProjectList() {
  return Object.keys(PROJECT_CONFIGS)
}

// 读取环境变量中的项目标识（默认使用project-a）
const currentProjectName = process.env.VUE_APP_PROJECT || 'project-a'
const currentConfig = getProjectConfig(currentProjectName)

// 默认导出当前项目配置（保持向后兼容）
export default currentConfig

// 同时导出配置注册表，供 vue.config.js 使用
export { PROJECT_CONFIGS }
