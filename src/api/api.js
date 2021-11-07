import request from '../utils/request'

export default {
  login (params) {
    return request({
      url: '/auth/login',
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
      url: '/user/list',
      method: 'get',
      data: params
    })
  },
  userDel (params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params
    })
  },
  menuSubmit (params) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params,
      mock: false
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
  getMenuList (params) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: params,
      mock: false
    })
  },
  getDeptList (params) {
    return request({
      url: '/department/list',
      method: 'post',
      data: params,
      mock: false
    })
  },
  getDeptTreeList (params) {
    return request({
      url: '/department/tree?pid=' + params,
      method: 'get',
      data: params,
      mock: false
    })
  },
  departmentUpdate (params) {
    return request({
      url: '/department/',
      method: 'put',
      data: params,
      mock: false
    })
  },
  roleOperate (params) {
    return request({
      url: '/roles/operate',
      method: 'post',
      data: params,
      mock: false
    })
  },
  getRoleList (params) {
    return request({
      url: '/roles/list',
      method: 'get',
      data: params,
      mock: false
    })
  },
  updatePermission (params) {
    return request({
      url: '/roles/update/permission',
      method: 'post',
      data: params,
      mock: false
    })
  },
  getPermissionList () {
    return request({
      url: '/users/getPermissionList',
      method: 'get',
      data: {},
      mock: false
    })
  },

  // 新增部门
  addDepartment (params) {
    return request({
      url: '/department/',
      method: 'post',
      data: params,
      mock: false
    })
  }

}
