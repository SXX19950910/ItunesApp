import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Lazyload } from 'vant'
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import './assets/styles/index.less'



const app = createApp(App)

app.use(createPinia())
app.use(Lazyload)
app.use(router)

app.mount('#app')
