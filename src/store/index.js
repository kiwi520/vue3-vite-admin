import { createStore } from 'vuex'
import user from './modules/user'

const state = {

}

const store = createStore({
  state,
  modules: {
    user
  }
})

export default store
