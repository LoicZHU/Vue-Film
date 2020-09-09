import axios from 'axios';

export default {
  namespaced: true,

  // state
  state: {
    isApiFetchedAtLeastOnce: false,
    filmsApiPages: [],
    currentApiPage: 1,
    totalApiPages: 0,
  },

  // getters
  getters: {
  },

  // actions
  actions: {
    // API : fetch list
    fetchFilms({ state, commit }) {
      axios.get(`https://api.themoviedb.org/3/search/movie?query=lego&page=${state.currentApiPage}&api_key=feb6f0eeaa0a72662967d77079850353`)
        .then((response) => {
          // commit mutations
          commit('setIsApiFetchedAtLeastOnce'); // set isApiFetchedAtLeastOnce
          commit('setFilmsApiPages', response.data.results); // set films list
          commit('setTotalApiPages', response.data.total_pages); // set total pages
          commit('setCurrentApiPage', state.currentApiPage); // set current page from the API's response
        });
    },
  },

  // mutations
  mutations: {
    // set isApiFetchedAtLeastOnce
    setIsApiFetchedAtLeastOnce(state) {
      state.isApiFetchedAtLeastOnce = true;
    },

    // set films list
    setFilmsApiPages(state, filmsPage) {
      state.filmsApiPages.push(filmsPage);
    },

    // set total pages
    setTotalApiPages(state, totalApiPages) {
      state.totalApiPages = totalApiPages;
    },

    // set current page
    setCurrentApiPage(state, currentApiPage) {
      state.currentApiPage = currentApiPage + 1;
    },
  },
};
