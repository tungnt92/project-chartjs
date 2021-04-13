// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import { Skeleton } from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Skeleton);

// eslint-disable-next-line no-undef
window.projectChart = new Vue();
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: (h) => h(App),
});
