// API接口定义文件
import { request, request_test } from '@/utils/request'

export default {
  // 用户相关API
  login: data => {
    return request.post('/user/login', data)
  },
  login2: data => {
    return request_test.post('/three/test', data)
  },
}
