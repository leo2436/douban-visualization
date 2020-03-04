import Vue from 'vue'
import App from './App.vue'
import echarts from "echarts";
import store from './vuex/store'
Vue.prototype.$echarts = echarts;
import '../node_modules/echarts/map/js/world.js'
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
