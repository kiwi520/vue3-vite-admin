/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/67f6c1fbe2c76d759c75dd075f508ad6/api/'
    // mockApi: ''
  },
  test: {
    baseApi: '/api',
    mockApi: ''
  },
  prod: {
    baseApi: '/api',
    mockApi: ''
  }
}
export default {
  storageNamespace: 'dev',
  env: 'dev',
  mock: false,
  ...EnvConfig[env]
}
