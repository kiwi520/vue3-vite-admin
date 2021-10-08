import request from '../utils/request'

export default {
  login (params) {
    console.log('22222')

    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      mock: false
    })
    // return request({
    //   url: '/users/login',
    //   method: 'post',
    //   data: params
    //   // mock: true
    // })
  }
}
