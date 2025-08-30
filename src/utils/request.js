import axios from 'axios'
import config from '@/config'

// 通用配置
const commonConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

// 通用请求拦截器
const createRequestInterceptor = () => (config) => {
  // 添加token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  // 开发环境下打印请求信息
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      data: config.data,
    })
  }
  
  return config
}

// 通用响应拦截器
const createResponseInterceptor = (instanceName = '') => ({
  success: (response) => {
    // 开发环境下打印响应信息
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Response ${instanceName}:`, {
        url: response.config.url,
        status: response.status,
        data: response.data,
      })
    }
    return response.data
  },
  error: (error) => {
    // 开发环境下打印错误信息
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ Error ${instanceName}:`, {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      })
    }
    
    // 统一错误处理
    if (error.response?.status === 401) {
      // 清除token并跳转到登录页
      localStorage.removeItem('token')
      // 可以在这里添加跳转到登录页的逻辑
      console.warn('Token已过期，请重新登录')
    }
    
    // 网络错误处理
    if (!error.response) {
      console.error('网络连接失败，请检查网络设置')
    }
    
    return Promise.reject(error)
  }
})

// 创建主要API实例
const request = axios.create({
  ...commonConfig,
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : config.baseurl,
})

// 创建测试API实例
const request_test = axios.create({
  ...commonConfig,
  baseURL: process.env.NODE_ENV === 'development' ? '/test' : 'https://www.baidu.com',
})

// 应用拦截器
const requestInterceptor = createRequestInterceptor()
const mainResponseInterceptor = createResponseInterceptor('[Main]')
const testResponseInterceptor = createResponseInterceptor('[Test]')

// 主要API实例拦截器
request.interceptors.request.use(requestInterceptor, error => Promise.reject(error))
request.interceptors.response.use(
  mainResponseInterceptor.success,
  mainResponseInterceptor.error
)

// 测试API实例拦截器
request_test.interceptors.request.use(requestInterceptor, error => Promise.reject(error))
request_test.interceptors.response.use(
  testResponseInterceptor.success,
  testResponseInterceptor.error
)

export { request, request_test }
