import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      popupData: {},
      showPopup: false,
      popupPosition: {},
      popupDirection: {}
    };
  },

  getters: {
    popupData: (state) => state.popupData,
    showPopup: (state) => state.showPopup,
    popupPosition: (state) => state.popupPosition,
    popupDirection: (state) => state.popupDirection
  },

  mutations: {
    setPopUpData(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.popupData = payload;
    },

    setPopupState(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.showPopup = payload;
    },

    setPopupPosition(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.popupPosition = payload;
    },

    setPopupDirection(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.popupDirection = payload;
    }
  }
});
