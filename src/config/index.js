/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/67f6c1fbe2c76d759c75dd075f508ad6/api'
  },
  test: {
    baseApi: '/',
    mockApi: ''
  },
  prod: {
    baseApi: '/',
    mockApi: ''
  }
}
export default {
  env: 'dev',
  mock: true,
  ...EnvConfig[env]
}
