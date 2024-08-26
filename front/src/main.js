import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

global.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

createApp(App)
  .use(vuetify)
  .use(router) 
  .mount('#app');

//const app = createApp(App);
//app.use(router);
//app.mount('#app');
