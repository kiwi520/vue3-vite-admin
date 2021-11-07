/**
 * axios http封装请求
 */

import { create } from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'

import config from '../config'
import qs from 'qs'
// import qs from 'qs'
import storage from '../utils/storage'

const TOKEN_INVALID = 'token认证失败，请重新登录'
// const NETWORK_ERROR = '网络出错，请稍后重试'

// 创建axios实例对象，添加全局配置
const http = create({
  baseURL: config.baseApi
  // timeout: 8000
})

// 请求拦截
http.interceptors.request.use((cf) => {
  const headers = cf.headers
  headers.contentType = 'application/json;charset=UTF-8'
  console.log('storage.getItem(\'_token\')')
  console.log(storage.getItem('_token'))
  console.log('storage.getItem(\'_token\')')
  // if (!headers.Authorization) headers.Authorization = 'Bearer ' + storage.getItem('_token')
  if (!headers.Authorization) headers.Authorization = storage.getItem('_token')
  if (cf.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return cf
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use((response) => {
  // Return a successful response back to the calling service

  return new Promise((resolve, reject) => {
    resolve(response)
  })
}, error => {
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }

  if (error.config.url === '/users/refreshToken' || error.response.message === 'Account is disabled.') {
    // TokenStorage.clear()
    storage.clearAll()
    ElMessage.error(TOKEN_INVALID)
    router.push({ name: 'login' })

    return new Promise((resolve, reject) => {
      reject(error)
    })
  }

  // const refresh_flag = false
  const userId = storage.getItem('userInfo')._id
  const refreshToken = storage.getItem('_refresh_token')

  return http.post('/users/refreshToken',
    {
      userId,
      refreshToken
    }

  ).then((token) => {
    // New request with new token
    const config = error.config
    // config.headers.Authorization = 'Bearer ' + token.data.data.token
    config.headers.Authorization = token.data.data.token
    storage.setItem('_token', token.data.data.token)
    return new Promise((resolve, reject) => {
      http.request(config).then(response => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  })
    .catch((error) => {
      Promise.reject(error)
    })
})
// 响应拦截
// http.interceptors.response.use((res) => {
//   console.log('interceptors')
//   console.log('interceptors')
//   console.log(res)
//   console.log('interceptors')
//
//   const { code } = res.data
//   if (code === 50001) {
//     ElMessage.error(TOKEN_INVALID)
//
//     setTimeout(() => {
//       router.push({ name: 'login' })
//     }, 1500)
//
//     return Promise.reject(TOKEN_INVALID)
//   } else {
//     console.log('interceptors err')
//     console.log('interceptors err')
//     console.log('interceptors err')
//     // ElMessage.error(msg || NETWORK_ERROR)
//     return Promise.resolve(res)
//   }
// })

/**
 * 请求封装函数
 * @param options
 */
function request (options) {
  options.method = options.method || 'get'

  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'prod') {
    http.defaults.baseURL = config.baseApi
  } else {
    http.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

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

// /**
//  * get方法，对应get请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */
// export function get (url, params) {
//   return new Promise((resolve, reject) => {
//     request.get(url, {
//       params: params
//     }).then(res => {
//       resolve(res.data)
//     }).catch(err => {
//       reject(err.data)
//     })
//   })
// }
//
// /**
//  * post方法，对应post请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */
// export function post (url, params) {
//   return new Promise((resolve, reject) => {
//     request.post(url, qs.stringify(params))
//       .then(res => {
//         resolve(res.data)
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   })
// }

export default request
