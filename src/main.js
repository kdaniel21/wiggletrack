import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { dom } from '@fortawesome/fontawesome-svg-core';
import './main.scss';
import App from './App.vue';
import router from './router';
import store from './store';

import interceptorSetup from './helpers/interceptor';
import progressbarOptions from './helpers/progressbar-options';

Vue.config.productionTip = false;

// FontAwesome config
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
dom.watch();

// Bootstrap config
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueProgressBar, progressbarOptions);

interceptorSetup();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
