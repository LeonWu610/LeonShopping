/* eslint-disable indent */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import './style/iconfont.css'
import { Tabbar, TabbarItem, Icon } from 'vant'

createApp(App).use(store)
.use(Tabbar).use(TabbarItem).use(Icon).use(router)
.mount('#app')
