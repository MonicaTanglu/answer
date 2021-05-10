import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import store from './store'
// import './api/mock.js'
const app = createApp(App)
setupRouter(app)
app.use(store).use(Antd)
router.isReady().then(() => app.mount('#app'))
