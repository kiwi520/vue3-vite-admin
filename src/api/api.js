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

  getMenuList (params) {
    return request({
      url: '/menu/list',
      method: 'get',
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

  // 后台用户
  // 后台添加用户
  userSubmit (params) {
    return request({
      url: '/admin/',
      method: 'post',
      data: params,
      mock: false
    })
  },
  // 后台编辑用户
  adminUserUpdate (params) {
    return request({
      url: '/admin/',
      method: 'put',
      data: params,
      mock: false
    })
  },
  getAdminUserList (params) {
    return request({
      url: '/admin/list',
      method: 'post',
      data: params
    })
  },
  adminDel (params) {
    return request({
      url: '/admin?id=' + params,
      method: 'delete',
      data: {}
    })
  },

  // 部门
  // 新增部门
  addDepartment (params) {
    return request({
      url: '/department/',
      method: 'post',
      data: params,
      mock: false
    })
  },
  // 删除部门
  deleteDepartment (id) {
    return request({
      url: '/department?id=' + id,
      method: 'delete',
      data: {},
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

  // 角色

  // 角色列表
  getRoleList (params) {
    return request({
      url: '/role/list',
      method: 'post',
      data: params,
      mock: false
    })
  },

  // 新增部门
  addRole (params) {
    return request({
      url: '/role/',
      method: 'post',
      data: params,
      mock: false
    })
  }
}
