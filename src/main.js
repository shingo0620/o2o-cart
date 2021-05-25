import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import FontAwesomeIcon from './plugins/fontawesome'
import VueQrcodeReader from 'vue3-qrcode-reader'
import router from './plugins/router'

const app = createApp(App)
app.use(router)
app.use(VueQrcodeReader)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')