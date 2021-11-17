import request from '../utils/request'

export default {
  login (params) {
    return request({
      url: '/auth/login',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  noticeCount (params) {
    return request({
      url: '/leave/count',
      method: 'get',
      ContentType: false,
      mock: true
    })
  },
  menuList (params) {
    return request({
      url: '/menu/count',
      method: 'get',
      ContentType: false,
      mock: false
    })
  },
  getUserList (params) {
    return request({
      url: '/user/list',
      method: 'get',
      ContentType: false,
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
  roleOperate (params) {
    return request({
      url: '/roles/operate',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },

  updatePermission (params) {
    return request({
      url: '/roles/update/permission',
      method: 'post',
      data: params,
      ContentType: false,
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
      ContentType: false,
      mock: false
    })
  },
  // 后台编辑用户
  adminUserUpdate (params) {
    return request({
      url: '/admin/',
      method: 'put',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  getAdminUserList (params) {
    return request({
      url: '/admin/list',
      method: 'post',
      ContentType: false,
      data: params
    })
  },
  adminDel (params) {
    return request({
      url: '/admin?id=' + params,
      method: 'delete',
      ContentType: false,
      data: {}
    })
  },

  // 获取用户左侧菜单列表
  getPermissionList () {
    return request({
      url: '/user/permission',
      method: 'get',
      data: {},
      ContentType: false,
      mock: false
    })
  },

  // 部门
  // 新增部门
  addDepartment (params) {
    return request({
      url: '/department/',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  // 删除部门
  deleteDepartment (id) {
    return request({
      url: '/department?id=' + id,
      method: 'delete',
      data: {},
      ContentType: false,
      mock: false
    })
  },
  getDeptList (params) {
    return request({
      url: '/department/list',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  getDeptTreeList (params) {
    return request({
      url: '/department/tree?pid=' + params,
      method: 'get',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  departmentUpdate (params) {
    return request({
      url: '/department/',
      method: 'put',
      data: params,
      ContentType: false,
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
      ContentType: false,
      mock: false
    })
  },
  getRoleAllList () {
    return request({
      url: '/role/all',
      method: 'get',
      data: {},
      ContentType: false,
      mock: false
    })
  },

  // 新增角色
  addRole (params) {
    return request({
      url: '/role/',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  // 编辑角色
  updateRole (params) {
    return request({
      url: '/role/',
      method: 'put',
      data: params,
      ContentType: false,
      mock: false
    })
  }, // 编辑角色权限
  updateRolePermission (params) {
    return request({
      url: '/role/setPermission',
      method: 'put',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  // 删除角色
  deleteRole (params) {
    return request({
      url: '/role?id=' + params,
      method: 'delete',
      data: {},
      ContentType: false,
      mock: false
    })
  },

  // 菜单

  // 新增菜单
  addMenu (params) {
    return request({
      url: '/menu',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },

  // 新增菜单
  updateMenu (params) {
    return request({
      url: '/menu',
      method: 'put',
      data: params,
      ContentType: false,
      mock: false
    })
  },

  getMenuList (params) {
    return request({
      url: '/menu/list',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },

  getMenuTreeList (params) {
    return request({
      url: '/menu/tree?pid=' + params,
      method: 'get',
      data: { },
      ContentType: false,
      mock: false
    })
  },

  // 删除菜单
  deleteMenu (params) {
    return request({
      url: '/menu?id=' + params,
      method: 'delete',
      data: {},
      ContentType: false,
      mock: false
    })
  },

  // 上传app应用
  uploadAppVersion (params) {
    return request({
      url: '/appVersion/uploadChunk',
      method: 'post',
      data: params,
      ContentType: true,
      mock: false
    })
  },

  // app管理

  // 上传app应用
  mergeChunkAppVersion (params) {
    return request({
      url: '/appVersion/mergeChunk',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  // 新增app应用
  addAppVersion (params) {
    return request({
      url: '/appVersion/',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  // 编辑app应用
  updateAppVersion (params) {
    return request({
      url: '/appVersion/',
      method: 'put',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  // 编辑app应用
  deleteAppVersion (params) {
    return request({
      url: '/appVersion?id=' + params,
      method: 'delete',
      data: {},
      ContentType: false,
      mock: false
    })
  },
  // 下载app应用
  downloadAppVersionFile (params) {
    return request({
      url: '/appVersion/downloadAppVersionFile?id=' + params,
      method: 'get',
      data: {},
      responseType: 'blob',
      mock: false
    })
  },
  // 查询app应用
  getAppVersionList (params) {
    return request({
      url: '/appVersion/list',
      method: 'post',
      data: params,
      ContentType: false,
      mock: false
    })
  },
  // 删除app附件
  deleteAppApk (params) {
    return request({
      url: '/appVersion/deleteAppApk',
      method: 'delete',
      data: params,
      ContentType: false,
      mock: false
    })
  }
}
