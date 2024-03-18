import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
