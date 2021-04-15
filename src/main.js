// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import { Spin } from 'ant-design-vue';
import App from './App.vue';
import store from './store';
import 'ant-design-vue/dist/antd.css';

Vue.use(Spin);

// eslint-disable-next-line no-undef
window.projectChart = new Vue();
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
});
