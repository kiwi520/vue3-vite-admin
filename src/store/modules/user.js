// import profile from '../../api/api'

import storage from '../../utils/storage'
import { SAVEUSERINFO } from '../mutation-types'

export default {
  namespaced: true,
  state: () => ({
    userInfo: {} || storage.getItem('userInfo'), // 获取用户信息
    _token: {} || storage.getItem('_token') // 获取用户token
  }),
  getters: {
    getUserInfo (state, mutation) {
      return Object.keys(state.userInfo).length === 0 ? storage.getItem('userInfo') : state.userInfo
    }
  },
  mutations: {
    [SAVEUSERINFO] (state, payload) {
      state.userInfo = payload
      console.log('payload')
      console.log(payload)
      console.log('payload')
      // storage.setItem('_refresh_token', payload.refreshToken || {})
    }
  },
  actions: {
    GetProfile (context, payload) {
      console.log('acccc')
      console.log('acccc')
      console.log('acccc')
      console.log('acccc')
      // await profile().then(res => {
      //   console.log('res')
      //   console.log(res)
      //   console.log('res')
      // }).catch(err => {
      //   console.log('err')
      //   console.log(err)
      //   console.log('err')
      // })
      // if (JSON.stringify(userInfo) === '{}') {
      //   reject(new Error('没有该用户'))
      // } else {
      //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.nZ86hUWPdG43W6HVSGFy6DJnDVOZhx8a73LhQ3gIxY8'
      //   const userData = JSON.parse(userInfo)
      //   if (userData.password === payload.password) {
      //     localStorage.setItem('current_user', JSON.stringify(payload))
      //     localStorage.setItem('_token', token)
      //     context.commit('login', { userInfo, token })
      //     resolve(res => true)
      //   } else {
      //     reject(new Error('登陆失败,请重试'))
      //   }
      // }
    }
  }
}
