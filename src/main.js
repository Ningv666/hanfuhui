import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入配置vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
import less from 'less'
import '../public/css/icon.css'
import moment from 'moment'
import 'lib-flexible'
import infiniteScroll from 'vue-infinite-scroll'
Vue.prototype.moment = moment
Vue.use(Vant);
Vue.use(less);
Vue.use(infiniteScroll);

//配置axios
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.axios = axios;
Vue.config.productionTip = false

  
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
