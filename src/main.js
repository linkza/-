import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/base.less'
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
import imgl from './hook/imgL'

const app = createApp(App)

app.use(store).use(router).mount('#app')
app.directive('limg', imgl)
