import request from '../utils/request'

export default {
  login (params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      mock: false
    })
  },
  noticeCount (params) {
    return request({
      url: '/leave/count',
      method: 'get',
      mock: true
    })
  },
  menuList (params) {
    return request({
      url: '/menu/count',
      method: 'get',
      mock: false
    })
  },
  getDeptLeaderList (params) {
    return request({
      url: '/dept/deptLeaderList',
      method: 'get',
      mock: false
    })
  },
  getRoleAllList () {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: {},
      mock: false
    })
  },
  getUserList (params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params
    })
  },
  userSubmit (params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params,
      mock: false
    })
  },
  getDeptList (params) {
    return request({
      url: '/dept/list',
      method: 'get',
      data: params,
      mock: false
    })
  },
  deptOperate (params) {
    return request({
      url: '/dept/operate',
      method: 'post',
      data: params,
      mock: false
    })
  }

}
