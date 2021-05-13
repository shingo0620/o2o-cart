import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import FontAwesomeIcon from './plugins/fontawesome'
import store from './store'

const app = createApp(App)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')