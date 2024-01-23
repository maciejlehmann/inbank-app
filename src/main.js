import './assets/base.scss'
import 'primevue/resources/themes/mdc-light-deeppurple/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.mount('#app')
