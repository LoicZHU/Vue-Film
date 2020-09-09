import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import films from './modules/films';
import favorite from './modules/favorite';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  modules: {
    films,
    favorite,
  },

  state: {
  },

  actions: {
  },

  mutations: {
  },
});
