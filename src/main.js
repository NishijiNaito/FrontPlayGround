import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Socketio from '@/plugins/Socket.io';


import '@tabler/core'
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/css/tabler-flags.min.css'
import '@tabler/core/dist/css/tabler-payments.min.css'
import '@tabler/core/dist/css/tabler-vendors.min.css'
import '@tabler/core/dist/js/tabler.esm'




const app = createApp(App)
app.use(store).use(router)
app.use(Socketio, {
    connection: 'http://113.53.197.15:3000',
    options: {
        // Your Socket.io options here
    }
})

app.mount('#app')