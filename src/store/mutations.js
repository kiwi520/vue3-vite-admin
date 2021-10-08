/**
 * Mutations 业务层数据提交
 */

import storage from '../utils/storage'

export default {
  saveUserInfo (state, payload) {
    state.userInfo = payload
    console.log('payload')
    console.log(payload)
    console.log('payload')
    storage.setItem('userInfo', payload)
  }
}
