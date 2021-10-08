import { createStore } from 'vuex'
import user from './modules/user'
import storage from '../utils/storage'
import mutations from './mutations'

const state = {
  userInfo: {} || storage.getItem('userInfo') // 获取用户信息
}

const store = createStore({
  state,
  mutations,
  modules: {
    user
  }
})

export default store
