import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import VueCompositionApi from '@vue/composition-api';

// Vue.use(VueCompositionApi);
createApp(App).use(store).use(router).mount('#app')
// createApp(App).use(store).use(router).use(VueCompositionApi).mount('#app')
