import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import axios from 'axios'
import config from './config'

import 'element-plus/lib/theme-chalk/index.css'

axios.post(config.mockApi + '/login').then(res => {
  console.log(res)
})

createApp(App).use(router).use(ElementPlus).use(store).mount('#app')
