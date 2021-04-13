// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import App from './App.vue';

// eslint-disable-next-line no-undef
window.eventBus = new Vue();
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: (h) => h(App),
});
