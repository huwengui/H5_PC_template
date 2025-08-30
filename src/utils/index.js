/**
 * 工具函数库
 * @description 提供项目中常用的工具函数，包括基础工具、验证、DOM操作、数学计算等
 * @author Vue项目模板
 * @version 1.0.0
 */

// ==================== 基础工具函数 ====================

/**
 * 防抖函数
 * @description 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 防抖后的函数
 * @example
 * const debouncedSearch = debounce(searchFunction, 300)
 * input.addEventListener('input', debouncedSearch)
 */
export function debounce(func, wait, immediate = false) {
  let timeoutId
  return function executedFunction(...args) {
    const later = () => {
      timeoutId = null
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeoutId
    clearTimeout(timeoutId)
    timeoutId = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

/**
 * 节流函数
 * @description 规定在一个单位时间内，只能触发一次函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 时间间隔（毫秒）
 * @returns {Function} 节流后的函数
 * @example
 * const throttledScroll = throttle(handleScroll, 100)
 * window.addEventListener('scroll', throttledScroll)
 */
export function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * 深拷贝
 * @description 创建对象的深层副本
 * @param {any} obj - 要拷贝的对象
 * @returns {any} 深拷贝后的对象
 * @example
 * const original = { a: 1, b: { c: 2 } }
 * const copy = deepClone(original)
 * copy.b.c = 3 // 不会影响original.b.c
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * 格式化日期
 * @description 将日期格式化为指定格式的字符串
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @param {string} format - 格式字符串，支持 YYYY、MM、DD、HH、mm、ss
 * @returns {string} 格式化后的日期字符串
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD') // '2023-12-25'
 * formatDate(1640995200000, 'YYYY年MM月DD日 HH:mm:ss') // '2022年01月01日 08:00:00'
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 获取相对时间
 * @description 获取相对于当前时间的描述
 * @param {Date|string|number} date - 日期
 * @returns {string} 相对时间描述
 * @example
 * getRelativeTime(new Date(Date.now() - 60000)) // '1分钟前'
 * getRelativeTime(new Date(Date.now() + 3600000)) // '1小时后'
 */
export function getRelativeTime(date) {
  const now = new Date()
  const target = new Date(date)
  const diff = now - target
  const absDiff = Math.abs(diff)
  const isFuture = diff < 0
  const suffix = isFuture ? '后' : '前'

  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const year = day * 365

  if (absDiff < minute) return '刚刚'
  if (absDiff < hour) return `${Math.floor(absDiff / minute)}分钟${suffix}`
  if (absDiff < day) return `${Math.floor(absDiff / hour)}小时${suffix}`
  if (absDiff < month) return `${Math.floor(absDiff / day)}天${suffix}`
  if (absDiff < year) return `${Math.floor(absDiff / month)}个月${suffix}`
  return `${Math.floor(absDiff / year)}年${suffix}`
}

/**
 * 格式化数字
 * @description 将数字格式化为带千分位分隔符的字符串
 * @param {number} num - 要格式化的数字
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的数字字符串
 * @example
 * formatNumber(1234567.89) // '1,234,567.89'
 * formatNumber(1234567.89, 0) // '1,234,568'
 */
export function formatNumber(num, decimals = 2) {
  return num.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * 格式化文件大小
 * @description 将字节数格式化为可读的文件大小
 * @param {number} bytes - 字节数
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的文件大小
 * @example
 * formatFileSize(1024) // '1.00 KB'
 * formatFileSize(1048576) // '1.00 MB'
 */
export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

/**
 * 生成随机字符串
 * @description 生成指定长度的随机字符串
 * @param {number} length - 字符串长度
 * @param {string} chars - 字符集
 * @returns {string} 随机字符串
 * @example
 * generateRandomString(8) // 'aBc3Def9'
 * generateRandomString(6, '0123456789') // '123456'
 */
export function generateRandomString(
  length = 8,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 生成UUID
 * @description 生成符合RFC4122标准的UUID v4
 * @returns {string} UUID字符串
 * @example
 * generateUUID() // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 本地存储工具
 * @description 封装localStorage，支持过期时间和JSON序列化
 */
export const storage = {
  /**
   * 设置存储项
   * @param {string} key - 键名
   * @param {any} value - 值
   * @param {number} expire - 过期时间（毫秒），可选
   * @example
   * storage.set('user', { name: 'John' }, 3600000) // 1小时后过期
   */
  set(key, value, expire) {
    const data = {
      value,
      expire: expire ? Date.now() + expire : null,
    }
    localStorage.setItem(key, JSON.stringify(data))
  },

  /**
   * 获取存储项
   * @param {string} key - 键名
   * @returns {any} 存储的值，如果不存在或已过期则返回null
   * @example
   * const user = storage.get('user')
   */
  get(key) {
    const item = localStorage.getItem(key)
    if (!item) return null

    try {
      const data = JSON.parse(item)
      if (data.expire && Date.now() > data.expire) {
        localStorage.removeItem(key)
        return null
      }
      return data.value
    } catch {
      return null
    }
  },

  /**
   * 删除存储项
   * @param {string} key - 键名
   * @example
   * storage.remove('user')
   */
  remove(key) {
    localStorage.removeItem(key)
  },

  /**
   * 清空所有存储
   * @example
   * storage.clear()
   */
  clear() {
    localStorage.clear()
  },
}

/**
 * URL工具
 * @description URL相关的工具函数
 */
export const urlUtils = {
  /**
   * 获取URL参数
   * @param {string} name - 参数名
   * @param {string} url - URL字符串，默认为当前页面URL
   * @returns {string|null} 参数值
   * @example
   * urlUtils.getParam('id') // 从当前URL获取id参数
   * urlUtils.getParam('name', 'https://example.com?name=John') // 'John'
   */
  getParam(name, url = window.location.href) {
    const urlObj = new URL(url)
    return urlObj.searchParams.get(name)
  },

  /**
   * 获取所有URL参数
   * @param {string} url - URL字符串，默认为当前页面URL
   * @returns {Object} 参数对象
   * @example
   * urlUtils.getAllParams() // { id: '123', name: 'John' }
   */
  getAllParams(url = window.location.href) {
    const urlObj = new URL(url)
    const params = {}
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  },

  /**
   * 构建URL
   * @param {string} base - 基础URL
   * @param {Object} params - 参数对象
   * @returns {string} 完整URL
   * @example
   * urlUtils.buildUrl('https://api.example.com', { id: 123, type: 'user' })
   * // 'https://api.example.com?id=123&type=user'
   */
  buildUrl(base, params = {}) {
    const url = new URL(base)
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.set(key, params[key])
      }
    })
    return url.toString()
  },
}

/**
 * 数组工具
 * @description 数组相关的工具函数
 */
export const arrayUtils = {
  /**
   * 数组去重
   * @param {Array} arr - 原数组
   * @param {string|Function} key - 去重依据的键名或函数
   * @returns {Array} 去重后的数组
   * @example
   * arrayUtils.unique([1, 2, 2, 3]) // [1, 2, 3]
   * arrayUtils.unique([{id: 1}, {id: 2}, {id: 1}], 'id') // [{id: 1}, {id: 2}]
   */
  unique(arr, key) {
    if (!key) return [...new Set(arr)]
    const seen = new Set()
    return arr.filter(item => {
      const value = typeof key === 'function' ? key(item) : item[key]
      if (seen.has(value)) return false
      seen.add(value)
      return true
    })
  },

  /**
   * 数组分组
   * @param {Array} arr - 原数组
   * @param {string|Function} key - 分组依据的键名或函数
   * @returns {Object} 分组后的对象
   * @example
   * arrayUtils.groupBy([{type: 'A', value: 1}, {type: 'B', value: 2}], 'type')
   * // { A: [{type: 'A', value: 1}], B: [{type: 'B', value: 2}] }
   */
  groupBy(arr, key) {
    return arr.reduce((groups, item) => {
      const value = typeof key === 'function' ? key(item) : item[key]
      if (!groups[value]) groups[value] = []
      groups[value].push(item)
      return groups
    }, {})
  },

  /**
   * 数组分块
   * @param {Array} arr - 原数组
   * @param {number} size - 每块的大小
   * @returns {Array} 分块后的二维数组
   * @example
   * arrayUtils.chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
   */
  chunk(arr, size) {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  },
}

/**
 * 设备检测工具
 * @description 检测设备类型和浏览器信息
 */
export const deviceUtils = {
  /**
   * 检测是否为移动设备
   * @returns {boolean} 是否为移动设备
   * @example
   * deviceUtils.isMobile() // true/false
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  },

  /**
   * 检测是否为iOS设备
   * @returns {boolean} 是否为iOS设备
   * @example
   * deviceUtils.isIOS() // true/false
   */
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  },

  /**
   * 检测是否为Android设备
   * @returns {boolean} 是否为Android设备
   * @example
   * deviceUtils.isAndroid() // true/false
   */
  isAndroid() {
    return /Android/.test(navigator.userAgent)
  },

  /**
   * 获取浏览器信息
   * @returns {Object} 浏览器信息对象
   * @example
   * deviceUtils.getBrowserInfo() // { name: 'Chrome', version: '91.0.4472.124' }
   */
  getBrowserInfo() {
    const ua = navigator.userAgent
    let browser = 'Unknown'
    let version = 'Unknown'

    if (ua.indexOf('Chrome') > -1) {
      browser = 'Chrome'
      version = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)?.[1] || 'Unknown'
    } else if (ua.indexOf('Firefox') > -1) {
      browser = 'Firefox'
      version = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown'
    } else if (ua.indexOf('Safari') > -1) {
      browser = 'Safari'
      version = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown'
    }

    return { name: browser, version }
  },
}

// ==================== 验证工具函数 ====================

/**
 * 验证规则配置
 * @description 常用的验证规则正则表达式
 */
export const VALIDATION_RULES = {
  // 手机号（中国大陆）
  PHONE: /^1[3-9]\d{9}$/,
  // 邮箱
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // 身份证号（15位或18位）
  ID_CARD:
    /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  // 密码（8-20位，包含字母和数字）
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/,
  // 强密码（8-20位，包含大小写字母、数字和特殊字符）
  STRONG_PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
  // 中文姓名
  CHINESE_NAME: /^[\u4e00-\u9fa5]{2,8}$/,
  // 英文姓名
  ENGLISH_NAME: /^[A-Za-z\s]{2,50}$/,
  // 银行卡号
  BANK_CARD: /^\d{16,19}$/,
  // 车牌号
  LICENSE_PLATE:
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  // URL
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  // IPv4地址
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  // 邮政编码
  POSTAL_CODE: /^\d{6}$/,
}

/**
 * 验证是否为空
 * @param {any} value - 要验证的值
 * @returns {boolean} 验证结果
 * @example
 * isEmpty('') // true
 * isEmpty(' ') // true
 * isEmpty(null) // true
 * isEmpty('hello') // false
 */
export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0)
  )
}

/**
 * 验证字符串长度
 * @param {string} value - 要验证的字符串
 * @param {number} min - 最小长度
 * @param {number} max - 最大长度
 * @returns {boolean} 验证结果
 * @example
 * validateLength('hello', 3, 10) // true
 * validateLength('hi', 3, 10) // false
 */
export function validateLength(value, min, max) {
  const length = value ? value.length : 0
  return length >= min && length <= max
}

/**
 * 验证数值范围
 * @param {number} value - 要验证的数值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {boolean} 验证结果
 * @example
 * validateRange(5, 1, 10) // true
 * validateRange(15, 1, 10) // false
 */
export function validateRange(value, min, max) {
  return value >= min && value <= max
}

/**
 * 验证手机号
 * @param {string} phone - 手机号
 * @returns {boolean} 验证结果
 * @example
 * validatePhone('13812345678') // true
 * validatePhone('12345678901') // false
 */
export function validatePhone(phone) {
  return VALIDATION_RULES.PHONE.test(phone)
}

/**
 * 验证邮箱
 * @param {string} email - 邮箱地址
 * @returns {boolean} 验证结果
 * @example
 * validateEmail('user@example.com') // true
 * validateEmail('invalid-email') // false
 */
export function validateEmail(email) {
  return VALIDATION_RULES.EMAIL.test(email)
}

/**
 * 验证身份证号
 * @param {string} idCard - 身份证号
 * @returns {boolean} 验证结果
 * @example
 * validateIdCard('110101199003077777') // true
 * validateIdCard('123456') // false
 */
export function validateIdCard(idCard) {
  if (!VALIDATION_RULES.ID_CARD.test(idCard)) return false

  // 18位身份证校验码验证
  if (idCard.length === 18) {
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let sum = 0
    for (let i = 0; i < 17; i++) {
      sum += parseInt(idCard[i]) * weights[i]
    }
    const checkCode = checkCodes[sum % 11]
    return idCard[17].toUpperCase() === checkCode
  }

  return true
}

/**
 * 验证密码强度
 * @param {string} password - 密码
 * @param {string} level - 强度等级：'weak'|'medium'|'strong'
 * @returns {boolean} 验证结果
 * @example
 * validatePassword('abc123', 'weak') // true
 * validatePassword('Abc123!@', 'strong') // true
 */
export function validatePassword(password, level = 'medium') {
  if (level === 'weak') {
    return password.length >= 6
  } else if (level === 'medium') {
    return VALIDATION_RULES.PASSWORD.test(password)
  } else if (level === 'strong') {
    return VALIDATION_RULES.STRONG_PASSWORD.test(password)
  }
  return false
}

/**
 * 验证中文姓名
 * @param {string} name - 姓名
 * @returns {boolean} 验证结果
 * @example
 * validateChineseName('张三') // true
 * validateChineseName('John') // false
 */
export function validateChineseName(name) {
  return VALIDATION_RULES.CHINESE_NAME.test(name)
}

/**
 * 验证银行卡号
 * @param {string} cardNumber - 银行卡号
 * @returns {boolean} 验证结果
 * @example
 * validateBankCard('6222021234567890123') // true
 * validateBankCard('123456') // false
 */
export function validateBankCard(cardNumber) {
  if (!VALIDATION_RULES.BANK_CARD.test(cardNumber)) return false

  // Luhn算法验证
  let sum = 0
  let isEven = false
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i])
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * 验证URL
 * @param {string} url - URL地址
 * @returns {boolean} 验证结果
 * @example
 * validateUrl('https://www.example.com') // true
 * validateUrl('invalid-url') // false
 */
export function validateUrl(url) {
  return VALIDATION_RULES.URL.test(url)
}

/**
 * 验证IPv4地址
 * @param {string} ip - IP地址
 * @returns {boolean} 验证结果
 * @example
 * validateIPv4('192.168.1.1') // true
 * validateIPv4('256.1.1.1') // false
 */
export function validateIPv4(ip) {
  return VALIDATION_RULES.IPV4.test(ip)
}

/**
 * 表单验证器类
 * @description 用于复杂表单验证的类
 * @example
 * const validator = new FormValidator()
 * validator.addRule('email', [{ required: true }, { type: 'email' }])
 * const result = validator.validate({ email: 'user@example.com' })
 */
export class FormValidator {
  constructor() {
    this.rules = {}
    this.errors = {}
  }

  /**
   * 添加验证规则
   * @param {string} field - 字段名
   * @param {Array} rules - 验证规则数组
   */
  addRule(field, rules) {
    this.rules[field] = rules
  }

  /**
   * 验证单个字段
   * @param {string} field - 字段名
   * @param {any} value - 字段值
   * @returns {Array} 错误信息数组
   */
  validateField(field, value) {
    const rules = this.rules[field] || []
    const errors = []

    for (const rule of rules) {
      if (rule.required && isEmpty(value)) {
        errors.push(rule.message || `${field}是必填项`)
        continue
      }

      if (!isEmpty(value)) {
        if (rule.type === 'email' && !validateEmail(value)) {
          errors.push(rule.message || '请输入有效的邮箱地址')
        }
        if (rule.type === 'phone' && !validatePhone(value)) {
          errors.push(rule.message || '请输入有效的手机号')
        }
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(rule.message || `${field}长度不能少于${rule.minLength}位`)
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(rule.message || `${field}长度不能超过${rule.maxLength}位`)
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push(rule.message || `${field}格式不正确`)
        }
        if (rule.validator && typeof rule.validator === 'function') {
          const result = rule.validator(value)
          if (result !== true) {
            errors.push(
              typeof result === 'string' ? result : `${field}验证失败`
            )
          }
        }
      }
    }

    return errors
  }

  /**
   * 验证所有字段
   * @param {Object} data - 要验证的数据对象
   * @returns {Object} 验证结果
   */
  validate(data) {
    this.errors = {}
    let isValid = true

    for (const field in this.rules) {
      const fieldErrors = this.validateField(field, data[field])
      if (fieldErrors.length > 0) {
        this.errors[field] = fieldErrors
        isValid = false
      }
    }

    return {
      isValid,
      errors: this.errors,
    }
  }

  /**
   * 获取字段错误信息
   * @param {string} field - 字段名
   * @returns {Array} 错误信息数组
   */
  getFieldErrors(field) {
    return this.errors[field] || []
  }

  /**
   * 获取所有错误信息
   * @returns {Object} 所有错误信息
   */
  getAllErrors() {
    return this.errors
  }

  /**
   * 清除错误信息
   * @param {string} field - 字段名，不传则清除所有
   */
  clearErrors(field) {
    if (field) {
      delete this.errors[field]
    } else {
      this.errors = {}
    }
  }
}

/**
 * 创建验证器
 * @param {Object} rules - 验证规则
 * @returns {FormValidator} 验证器实例
 * @example
 * const validator = createValidator({
 *   email: [{ required: true }, { type: 'email' }],
 *   password: [{ required: true }, { minLength: 6 }]
 * })
 */
export function createValidator(rules) {
  const validator = new FormValidator()
  for (const field in rules) {
    validator.addRule(field, rules[field])
  }
  return validator
}

// ==================== DOM操作工具函数 ====================

/**
 * 元素选择器
 * @description 简化的元素选择器，类似jQuery的$函数
 * @param {string} selector - CSS选择器
 * @param {Element} context - 查找上下文，默认为document
 * @returns {Element|null} 匹配的第一个元素
 * @example
 * const el = $("#myId") // 获取ID为myId的元素
 * const btn = $(".btn", container) // 在container中查找class为btn的元素
 */
export function $(selector, context = document) {
  return context.querySelector(selector)
}

/**
 * 元素选择器（多个）
 * @description 获取所有匹配的元素
 * @param {string} selector - CSS选择器
 * @param {Element} context - 查找上下文，默认为document
 * @returns {NodeList} 匹配的所有元素
 * @example
 * const buttons = $$("button") // 获取所有button元素
 * const items = $$(".item", container) // 在container中查找所有class为item的元素
 */
export function $$(selector, context = document) {
  return context.querySelectorAll(selector)
}

/**
 * 添加CSS类
 * @description 为元素添加一个或多个CSS类
 * @param {Element} element - 目标元素
 * @param {string|Array} className - 类名或类名数组
 * @example
 * addClass(el, 'active') // 添加单个类
 * addClass(el, ['active', 'highlight']) // 添加多个类
 */
export function addClass(element, className) {
  if (!element) return

  if (Array.isArray(className)) {
    element.classList.add(...className)
  } else {
    element.classList.add(className)
  }
}

/**
 * 移除CSS类
 * @description 从元素移除一个或多个CSS类
 * @param {Element} element - 目标元素
 * @param {string|Array} className - 类名或类名数组
 * @example
 * removeClass(el, 'active') // 移除单个类
 * removeClass(el, ['active', 'highlight']) // 移除多个类
 */
export function removeClass(element, className) {
  if (!element) return

  if (Array.isArray(className)) {
    element.classList.remove(...className)
  } else {
    element.classList.remove(className)
  }
}

/**
 * 切换CSS类
 * @description 切换元素的CSS类
 * @param {Element} element - 目标元素
 * @param {string} className - 类名
 * @param {boolean} force - 强制添加或移除
 * @example
 * toggleClass(el, 'active') // 切换active类
 * toggleClass(el, 'active', true) // 强制添加active类
 */
export function toggleClass(element, className, force) {
  if (!element) return
  return element.classList.toggle(className, force)
}

/**
 * 检查是否包含CSS类
 * @description 检查元素是否包含指定的CSS类
 * @param {Element} element - 目标元素
 * @param {string} className - 类名
 * @returns {boolean} 是否包含该类
 * @example
 * hasClass(el, 'active') // true/false
 */
export function hasClass(element, className) {
  return element ? element.classList.contains(className) : false
}

/**
 * 设置元素样式
 * @description 设置元素的CSS样式
 * @param {Element} element - 目标元素
 * @param {string|Object} property - 样式属性名或样式对象
 * @param {string} value - 样式值（当property为字符串时）
 * @example
 * setStyle(el, 'color', 'red') // 设置单个样式
 * setStyle(el, { color: 'red', fontSize: '16px' }) // 设置多个样式
 */
export function setStyle(element, property, value) {
  if (!element) return

  if (typeof property === 'object') {
    Object.assign(element.style, property)
  } else {
    element.style[property] = value
  }
}

/**
 * 获取元素样式
 * @description 获取元素的计算样式
 * @param {Element} element - 目标元素
 * @param {string} property - 样式属性名
 * @returns {string} 样式值
 * @example
 * getStyle(el, 'color') // 'rgb(255, 0, 0)'
 */
export function getStyle(element, property) {
  return element ? window.getComputedStyle(element)[property] : ''
}

/**
 * 显示元素
 * @description 显示隐藏的元素
 * @param {Element} element - 目标元素
 * @param {string} display - 显示类型，默认为'block'
 * @example
 * show(el) // 显示元素
 * show(el, 'flex') // 以flex方式显示
 */
export function show(element, display = 'block') {
  if (element) element.style.display = display
}

/**
 * 隐藏元素
 * @description 隐藏元素
 * @param {Element} element - 目标元素
 * @example
 * hide(el) // 隐藏元素
 */
export function hide(element) {
  if (element) element.style.display = 'none'
}

/**
 * 切换元素显示/隐藏
 * @description 切换元素的显示状态
 * @param {Element} element - 目标元素
 * @param {string} display - 显示类型，默认为'block'
 * @returns {boolean} 当前是否显示
 * @example
 * toggle(el) // 切换显示/隐藏
 * toggle(el, 'flex') // 以flex方式切换
 */
export function toggle(element, display = 'block') {
  if (!element) return false

  const isHidden =
    element.style.display === 'none' || getStyle(element, 'display') === 'none'

  if (isHidden) {
    show(element, display)
    return true
  } else {
    hide(element)
    return false
  }
}

/**
 * 获取元素位置和尺寸
 * @description 获取元素的边界矩形信息
 * @param {Element} element - 目标元素
 * @returns {DOMRect} 位置和尺寸信息
 * @example
 * const rect = getRect(el) // { x, y, width, height, top, right, bottom, left }
 */
export function getRect(element) {
  return element ? element.getBoundingClientRect() : null
}

/**
 * 获取元素相对于文档的偏移
 * @description 获取元素相对于文档的偏移位置
 * @param {Element} element - 目标元素
 * @returns {Object} 偏移信息 { top, left }
 * @example
 * const offset = getOffset(el) // { top: 100, left: 50 }
 */
export function getOffset(element) {
  if (!element) return { top: 0, left: 0 }

  const rect = element.getBoundingClientRect()
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  }
}

/**
 * 滚动到指定元素
 * @description 平滑滚动到指定元素
 * @param {Element} element - 目标元素
 * @param {Object} options - 滚动选项
 * @example
 * scrollToElement(el) // 滚动到元素
 * scrollToElement(el, { behavior: 'smooth', block: 'center' })
 */
export function scrollToElement(element, options = {}) {
  if (!element) return

  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  }

  element.scrollIntoView({ ...defaultOptions, ...options })
}

/**
 * 滚动到顶部
 * @description 平滑滚动到页面顶部
 * @param {Object} options - 滚动选项
 * @example
 * scrollToTop() // 滚动到顶部
 * scrollToTop({ behavior: 'auto' }) // 立即滚动到顶部
 */
export function scrollToTop(options = {}) {
  const defaultOptions = {
    top: 0,
    behavior: 'smooth',
  }

  window.scrollTo({ ...defaultOptions, ...options })
}

/**
 * 添加事件监听器
 * @description 为元素添加事件监听器
 * @param {Element} element - 目标元素
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 * @param {boolean|Object} options - 事件选项
 * @example
 * on(button, 'click', handleClick)
 * on(element, 'scroll', handleScroll, { passive: true })
 */
export function on(element, event, handler, options = false) {
  if (element && handler) {
    element.addEventListener(event, handler, options)
  }
}

/**
 * 移除事件监听器
 * @description 移除元素的事件监听器
 * @param {Element} element - 目标元素
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 * @param {boolean|Object} options - 事件选项
 * @example
 * off(button, 'click', handleClick)
 */
export function off(element, event, handler, options = false) {
  if (element && handler) {
    element.removeEventListener(event, handler, options)
  }
}

/**
 * 添加一次性事件监听器
 * @description 添加只执行一次的事件监听器
 * @param {Element} element - 目标元素
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 * @example
 * once(button, 'click', () => console.log('只执行一次'))
 */
export function once(element, event, handler) {
  if (!element || !handler) return

  const onceHandler = e => {
    handler(e)
    off(element, event, onceHandler)
  }

  on(element, event, onceHandler)
}

/**
 * 事件委托
 * @description 在父元素上监听子元素的事件
 * @param {Element} container - 容器元素
 * @param {string} selector - 子元素选择器
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 * @example
 * delegate(list, '.item', 'click', handleItemClick)
 */
export function delegate(container, selector, event, handler) {
  if (!container || !handler) return

  on(container, event, e => {
    const target = e.target.closest(selector)
    if (target && container.contains(target)) {
      handler.call(target, e)
    }
  })
}

/**
 * 创建DOM元素
 * @description 创建DOM元素并设置属性和子元素
 * @param {string} tagName - 标签名
 * @param {Object} attributes - 属性对象
 * @param {string|Element|Array} children - 子元素
 * @returns {Element} 创建的元素
 * @example
 * const div = createElement('div', { class: 'container', id: 'main' }, 'Hello World')
 * const button = createElement('button', { type: 'button' }, ['Click ', createElement('span', {}, 'me')])
 */
export function createElement(tagName, attributes = {}, children = null) {
  const element = document.createElement(tagName)

  // 设置属性
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'class') {
      element.className = value
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value)
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value)
    } else {
      element[key] = value
    }
  }

  // 添加子元素
  if (children !== null) {
    if (typeof children === 'string') {
      element.textContent = children
    } else if (children instanceof Element) {
      element.appendChild(children)
    } else if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child))
        } else if (child instanceof Element) {
          element.appendChild(child)
        }
      })
    }
  }

  return element
}

/**
 * 移除DOM元素
 * @description 从DOM中移除元素
 * @param {Element} element - 要移除的元素
 * @example
 * removeElement(el) // 移除元素
 */
export function removeElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element)
  }
}

/**
 * 检查元素是否在视口中
 * @description 检查元素是否在可视区域内
 * @param {Element} element - 目标元素
 * @param {number} threshold - 阈值（0-1），默认为0
 * @returns {boolean} 是否在视口中
 * @example
 * isInViewport(el) // true/false
 * isInViewport(el, 0.5) // 元素50%可见时返回true
 */
export function isInViewport(element, threshold = 0) {
  if (!element) return false

  const rect = element.getBoundingClientRect()
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  const verticalVisible =
    rect.top + rect.height * threshold < windowHeight &&
    rect.bottom - rect.height * threshold > 0
  const horizontalVisible =
    rect.left + rect.width * threshold < windowWidth &&
    rect.right - rect.width * threshold > 0

  return verticalVisible && horizontalVisible
}

/**
 * 获取滚动位置
 * @description 获取元素或窗口的滚动位置
 * @param {Element|Window} element - 目标元素，默认为window
 * @returns {Object} 滚动位置 { x, y }
 * @example
 * getScrollPosition() // 获取窗口滚动位置
 * getScrollPosition(container) // 获取容器滚动位置
 */
export function getScrollPosition(element = window) {
  if (element === window) {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop,
    }
  } else {
    return {
      x: element.scrollLeft,
      y: element.scrollTop,
    }
  }
}

/**
 * 设置滚动位置
 * @description 设置元素或窗口的滚动位置
 * @param {Object} position - 滚动位置 { x, y }
 * @param {Element|Window} element - 目标元素，默认为window
 * @param {boolean} smooth - 是否平滑滚动
 * @example
 * setScrollPosition({ x: 0, y: 100 }) // 设置窗口滚动位置
 * setScrollPosition({ x: 0, y: 100 }, container, true) // 平滑滚动容器
 */
export function setScrollPosition(position, element = window, smooth = false) {
  if (element === window) {
    if (smooth) {
      window.scrollTo({
        left: position.x,
        top: position.y,
        behavior: 'smooth',
      })
    } else {
      window.scrollTo(position.x, position.y)
    }
  } else {
    if (smooth) {
      element.scrollTo({
        left: position.x,
        top: position.y,
        behavior: 'smooth',
      })
    } else {
      element.scrollLeft = position.x
      element.scrollTop = position.y
    }
  }
}

// ==================== 数学计算工具函数 ====================

/**
 * 数字精度处理
 * @description 解决JavaScript浮点数精度问题
 * @param {number} num - 数字
 * @param {number} precision - 精度位数，默认2位
 * @returns {number} 处理后的数字
 * @example
 * toFixed(0.1 + 0.2) // 0.3 (而不是0.30000000000000004)
 * toFixed(1.2345, 2) // 1.23
 * toFixed(1.2345, 4) // 1.2345
 */
export function toFixed(num, precision = 2) {
  return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
}

/**
 * 安全的加法运算
 * @description 避免浮点数精度问题的加法
 * @param {number} a - 加数
 * @param {number} b - 被加数
 * @returns {number} 计算结果
 * @example
 * add(0.1, 0.2) // 0.3 (而不是0.30000000000000004)
 * add(1.23, 4.56) // 5.79
 */
export function add(a, b) {
  const precision = Math.max(
    (a.toString().split('.')[1] || '').length,
    (b.toString().split('.')[1] || '').length
  )
  const factor = Math.pow(10, precision)
  return (Math.round(a * factor) + Math.round(b * factor)) / factor
}

/**
 * 安全的减法运算
 * @description 避免浮点数精度问题的减法
 * @param {number} a - 被减数
 * @param {number} b - 减数
 * @returns {number} 计算结果
 * @example
 * subtract(1.5, 1.2) // 0.3 (而不是0.29999999999999993)
 * subtract(10.25, 3.15) // 7.1
 */
export function subtract(a, b) {
  const precision = Math.max(
    (a.toString().split('.')[1] || '').length,
    (b.toString().split('.')[1] || '').length
  )
  const factor = Math.pow(10, precision)
  return (Math.round(a * factor) - Math.round(b * factor)) / factor
}

/**
 * 安全的乘法运算
 * @description 避免浮点数精度问题的乘法
 * @param {number} a - 乘数
 * @param {number} b - 被乘数
 * @returns {number} 计算结果
 * @example
 * multiply(0.1, 3) // 0.3 (而不是0.30000000000000004)
 * multiply(1.23, 2) // 2.46
 */
export function multiply(a, b) {
  const precision =
    (a.toString().split('.')[1] || '').length +
    (b.toString().split('.')[1] || '').length
  return Number((a * b).toFixed(precision))
}

/**
 * 安全的除法运算
 * @description 避免浮点数精度问题的除法
 * @param {number} a - 被除数
 * @param {number} b - 除数
 * @returns {number} 计算结果
 * @example
 * divide(0.3, 0.1) // 3 (而不是2.9999999999999996)
 * divide(1.21, 1.1) // 1.1
 */
export function divide(a, b) {
  if (b === 0) throw new Error('除数不能为0')
  const precision = Math.max(
    (a.toString().split('.')[1] || '').length,
    (b.toString().split('.')[1] || '').length
  )
  const factor = Math.pow(10, precision)
  return Math.round(a * factor) / Math.round(b * factor)
}

/**
 * 生成随机数
 * @description 生成指定范围内的随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @param {boolean} integer - 是否返回整数
 * @returns {number} 随机数
 * @example
 * random(1, 10) // 1.234567 (浮点数)
 * random(1, 10, true) // 7 (整数)
 */
export function random(min, max, integer = false) {
  const num = Math.random() * (max - min) + min
  return integer ? Math.floor(num) : num
}

/**
 * 生成随机整数
 * @description 生成指定范围内的随机整数
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 随机整数
 * @example
 * randomInt(1, 6) // 3 (模拟骰子)
 * randomInt(0, 100) // 42
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 计算百分比
 * @description 计算数值的百分比
 * @param {number} value - 当前值
 * @param {number} total - 总值
 * @param {number} precision - 精度位数
 * @returns {number} 百分比
 * @example
 * percentage(25, 100) // 25
 * percentage(1, 3, 2) // 33.33
 */
export function percentage(value, total, precision = 2) {
  if (total === 0) return 0
  return toFixed((value / total) * 100, precision)
}

/**
 * 限制数值范围
 * @description 将数值限制在指定范围内
 * @param {number} value - 要限制的值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 限制后的值
 * @example
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * 线性插值
 * @description 在两个值之间进行线性插值
 * @param {number} start - 起始值
 * @param {number} end - 结束值
 * @param {number} t - 插值参数（0-1）
 * @returns {number} 插值结果
 * @example
 * lerp(0, 100, 0.5) // 50
 * lerp(10, 20, 0.25) // 12.5
 */
export function lerp(start, end, t) {
  return start + (end - start) * t
}

/**
 * 数值映射
 * @description 将数值从一个范围映射到另一个范围
 * @param {number} value - 要映射的值
 * @param {number} inMin - 输入范围最小值
 * @param {number} inMax - 输入范围最大值
 * @param {number} outMin - 输出范围最小值
 * @param {number} outMax - 输出范围最大值
 * @returns {number} 映射后的值
 * @example
 * map(5, 0, 10, 0, 100) // 50 (将0-10范围的5映射到0-100范围)
 * map(25, 0, 100, -1, 1) // -0.5
 */
export function map(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * 计算平均值
 * @description 计算数组的平均值
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 平均值
 * @example
 * average([1, 2, 3, 4, 5]) // 3
 * average([10, 20, 30]) // 20
 */
export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
}

/**
 * 计算中位数
 * @description 计算数组的中位数
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 中位数
 * @example
 * median([1, 2, 3, 4, 5]) // 3
 * median([1, 2, 3, 4]) // 2.5
 */
export function median(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0

  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)

  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

/**
 * 计算众数
 * @description 计算数组的众数（出现次数最多的数）
 * @param {Array<number>} numbers - 数字数组
 * @returns {number|Array<number>} 众数（可能有多个）
 * @example
 * mode([1, 2, 2, 3, 4]) // 2
 * mode([1, 1, 2, 2, 3]) // [1, 2]
 */
export function mode(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return null

  const frequency = {}
  let maxFreq = 0

  // 统计频率
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1
    maxFreq = Math.max(maxFreq, frequency[num])
  })

  // 找出所有众数
  const modes = Object.keys(frequency)
    .filter(key => frequency[key] === maxFreq)
    .map(Number)

  return modes.length === 1 ? modes[0] : modes
}

/**
 * 计算标准差
 * @description 计算数组的标准差
 * @param {Array<number>} numbers - 数字数组
 * @param {boolean} sample - 是否为样本标准差，默认为总体标准差
 * @returns {number} 标准差
 * @example
 * standardDeviation([1, 2, 3, 4, 5]) // 1.58
 * standardDeviation([1, 2, 3, 4, 5], true) // 1.77 (样本标准差)
 */
export function standardDeviation(numbers, sample = false) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0

  const avg = average(numbers)
  const squaredDiffs = numbers.map(num => Math.pow(num - avg, 2))
  const avgSquaredDiff =
    squaredDiffs.reduce((sum, diff) => sum + diff, 0) /
    (sample ? numbers.length - 1 : numbers.length)

  return Math.sqrt(avgSquaredDiff)
}

/**
 * 获取最大值
 * @description 获取数组中的最大值
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 最大值
 * @example
 * max([1, 5, 3, 9, 2]) // 9
 */
export function max(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return null
  return Math.max(...numbers)
}

/**
 * 获取最小值
 * @description 获取数组中的最小值
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 最小值
 * @example
 * min([1, 5, 3, 9, 2]) // 1
 */
export function min(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return null
  return Math.min(...numbers)
}

/**
 * 计算总和
 * @description 计算数组所有元素的总和
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 总和
 * @example
 * sum([1, 2, 3, 4, 5]) // 15
 */
export function sum(numbers) {
  if (!Array.isArray(numbers)) return 0
  return numbers.reduce((total, num) => total + num, 0)
}

/**
 * 计算阶乘
 * @description 计算数字的阶乘
 * @param {number} n - 要计算阶乘的数字
 * @returns {number} 阶乘结果
 * @example
 * factorial(5) // 120 (5! = 5 × 4 × 3 × 2 × 1)
 * factorial(0) // 1
 */
export function factorial(n) {
  if (n < 0) throw new Error('阶乘不能计算负数')
  if (n === 0 || n === 1) return 1

  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

/**
 * 计算组合数
 * @description 计算从n个元素中选择r个元素的组合数
 * @param {number} n - 总元素数
 * @param {number} r - 选择元素数
 * @returns {number} 组合数
 * @example
 * combination(5, 2) // 10 (C(5,2) = 5!/(2!(5-2)!))
 * combination(10, 3) // 120
 */
export function combination(n, r) {
  if (r > n || r < 0) return 0
  if (r === 0 || r === n) return 1

  // 优化：C(n,r) = C(n,n-r)，选择较小的r
  r = Math.min(r, n - r)

  let result = 1
  for (let i = 0; i < r; i++) {
    result = (result * (n - i)) / (i + 1)
  }

  return Math.round(result)
}

/**
 * 计算排列数
 * @description 计算从n个元素中选择r个元素的排列数
 * @param {number} n - 总元素数
 * @param {number} r - 选择元素数
 * @returns {number} 排列数
 * @example
 * permutation(5, 2) // 20 (P(5,2) = 5!/(5-2)!)
 * permutation(10, 3) // 720
 */
export function permutation(n, r) {
  if (r > n || r < 0) return 0
  if (r === 0) return 1

  let result = 1
  for (let i = 0; i < r; i++) {
    result *= n - i
  }

  return result
}

/**
 * 角度转弧度
 * @description 将角度转换为弧度
 * @param {number} degrees - 角度值
 * @returns {number} 弧度值
 * @example
 * degreesToRadians(180) // 3.14159... (π)
 * degreesToRadians(90) // 1.5708... (π/2)
 */
export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180)
}

/**
 * 弧度转角度
 * @description 将弧度转换为角度
 * @param {number} radians - 弧度值
 * @returns {number} 角度值
 * @example
 * radiansToDegrees(Math.PI) // 180
 * radiansToDegrees(Math.PI / 2) // 90
 */
export function radiansToDegrees(radians) {
  return radians * (180 / Math.PI)
}

/**
 * 计算两点间距离
 * @description 计算二维平面上两点间的欧几里得距离
 * @param {Object} point1 - 第一个点 {x, y}
 * @param {Object} point2 - 第二个点 {x, y}
 * @returns {number} 距离
 * @example
 * distance({x: 0, y: 0}, {x: 3, y: 4}) // 5
 * distance({x: 1, y: 1}, {x: 4, y: 5}) // 5
 */
export function distance(point1, point2) {
  const dx = point2.x - point1.x
  const dy = point2.y - point1.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * 判断是否为质数
 * @description 判断一个数是否为质数
 * @param {number} num - 要判断的数字
 * @returns {boolean} 是否为质数
 * @example
 * isPrime(7) // true
 * isPrime(8) // false
 * isPrime(2) // true
 */
export function isPrime(num) {
  if (num < 2) return false
  if (num === 2) return true
  if (num % 2 === 0) return false

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false
  }

  return true
}

/**
 * 计算最大公约数
 * @description 使用欧几里得算法计算两个数的最大公约数
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 最大公约数
 * @example
 * gcd(48, 18) // 6
 * gcd(100, 25) // 25
 */
export function gcd(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)

  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }

  return a
}

/**
 * 计算最小公倍数
 * @description 计算两个数的最小公倍数
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 最小公倍数
 * @example
 * lcm(12, 18) // 36
 * lcm(4, 6) // 12
 */
export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b)
}

// ==================== 导入request模块 ====================

// 导入HTTP请求相关模块
import { request, request_test } from './request'

// 导出request模块
export { request, request_test }

// ==================== 默认导出 ====================

/**
 * 默认导出所有工具函数
 * @description 提供统一的默认导出接口
 */
export default {
  // 基础工具
  debounce,
  throttle,
  deepClone,
  formatDate,
  getRelativeTime,
  formatNumber,
  formatFileSize,
  generateRandomString,
  generateUUID,
  storage,
  urlUtils,
  arrayUtils,
  deviceUtils,

  // 验证工具
  VALIDATION_RULES,
  isEmpty,
  validateLength,
  validateRange,
  validatePhone,
  validateEmail,
  validateIdCard,
  validatePassword,
  validateChineseName,
  validateBankCard,
  validateUrl,
  validateIPv4,
  FormValidator,
  createValidator,

  // DOM操作
  $,
  $$,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  setStyle,
  getStyle,
  show,
  hide,
  toggle,
  getRect,
  getOffset,
  scrollToElement,
  scrollToTop,
  on,
  off,
  once,
  delegate,
  createElement,
  removeElement,
  isInViewport,
  getScrollPosition,
  setScrollPosition,

  // 数学计算
  toFixed,
  add,
  subtract,
  multiply,
  divide,
  random,
  randomInt,
  percentage,
  clamp,
  lerp,
  map,
  average,
  median,
  mode,
  standardDeviation,
  max,
  min,
  sum,
  factorial,
  combination,
  permutation,
  degreesToRadians,
  radiansToDegrees,
  distance,
  isPrime,
  gcd,
  lcm,

  // HTTP请求
  request,
  request_test,
}
