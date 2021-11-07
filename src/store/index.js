import { createStore } from 'vuex'
import user from './modules/user'
import storage from '../utils/storage'
import mutations from './mutations'

const state = {
  userInfo: {} || storage.getItem('userInfo'), // 获取用户信息
  _token: {} || storage.getItem('_token') // 获取用户token
}

const store = createStore({
  state,
  mutations,
  modules: {
    user
  }
})

export default store
