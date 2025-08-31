import axios from 'axios'
import config from '@/config'

// 通用配置
const baseConfig = {
  timeout: 10000,
}

// 通用请求拦截器
const requestInterceptor = config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

// 通用响应拦截器
const responseInterceptor = {
  success: response => response.data,
  error: error => Promise.reject(error),
}

// 创建实例的通用函数
const createInstance = baseURL => {
  const instance = axios.create({ ...baseConfig, baseURL })

  instance.interceptors.request.use(requestInterceptor, error =>
    Promise.reject(error)
  )
  instance.interceptors.response.use(
    responseInterceptor.success,
    responseInterceptor.error
  )

  return instance
}

// 创建实例 - 直接使用真实API地址，不依赖代理
const request = createInstance(config.baseurl)

const request_test = createInstance('https://www.baidu.com')

export { request, request_test }
