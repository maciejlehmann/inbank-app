import '/node_modules/primeflex/primeflex.css'
import 'primevue/resources/themes/mdc-light-deeppurple/theme.css'
import './resources/main.scss'
import PrimeVue from 'primevue/config'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
