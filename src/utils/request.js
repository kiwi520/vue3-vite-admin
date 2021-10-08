/**
 * axios http封装请求
 */

import { create } from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'

import config from '../config'

const TOKEN_INVALID = 'token认证失败，请重新登录'
const NETWORK_ERROR = '网络出错，请稍后重试'

// 创建axios实例对象，添加全局配置
const http = create({
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求拦截
http.interceptors.request.use((cf) => {
  const headers = cf.headers
  if (!headers.Authorization) headers.Authorization = 'Bear 21424estewt'

  return cf
})

// 响应拦截
http.interceptors.response.use((res) => {
  const { code, msg, data } = res.data
  if (code === 200) {
    return data
  } else if (code === 401) {
    ElMessage.error(TOKEN_INVALID)

    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1500)

    return Promise.reject(TOKEN_INVALID)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

/**
 * 请求封装函数
 * @param options
 */
function request (options) {
  options.method = options.method || 'get'

  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  // if (typeof options.mock !== 'undefined') {
  //   config.mock = options.mock
  // }

  // if (config.env === 'prod' || config.env === 'dev') {
  //   http.defaults.baseURL = config.baseApi
  // } else {
  //   http.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  // }

  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'prod') {
    http.defaults.baseURL = config.baseApi
  } else {
    http.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  console.log('options')
  console.log(options)
  console.log('options')

  return http(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
  console.log('kkkkkkk')
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})

export default request
