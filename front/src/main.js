import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

global.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

const app = createApp(App).use(vuetify).use(router)

// createApp(App)
//   .use(vuetify)
//   .use(router) 
//   .mount('#app');

//const app = createApp(App);
//app.use(router);
//app.mount('#app');

import servico_config from './api/config'
servico_config.buscar().then((config)=>{
   app.config.globalProperties.config = config;
   config.avatar = {tipo:'',dados:''};
    app.mount('#app');
    // app.use(GAuth, gAuthOptions);
    // app.mount('#app');
    //app.use(VueCollapsiblePanel).mount('#app')
})
