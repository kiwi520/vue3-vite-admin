import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import request from './utils/request'

import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.config.globalProperties.$request = request
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
