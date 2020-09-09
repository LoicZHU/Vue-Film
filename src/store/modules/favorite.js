export default {
  namespaced: true,

  // state
  state: {
    favoriteFilms: [],
    localStorageId: null,
    isFavoriteFilmsRestored: false,
    filmAddedOrRemovedOfFavorite: '',
  },

  // getters
  getters: {
  },

  // actions
  actions: {
    // add or remove the film of favoriteFilms
    addOrRemoveFilmOfFavorite({ state, commit }, film) {
      const foundFilm = state.favoriteFilms.find(
        (favoriteFilm) => favoriteFilm.id === film.id,
      );

      if (!foundFilm) {
        // line below to comment if use of localStorage
        commit('pushFilmInFavoriteFilms', film);

        commit('setFilmAddedOrRemovedOfFavorite', 'added'); // set filmAddedOrRemovedOfFavorite

        /**
         * début localStorage (pas besoin si createPersistedState dans index.js du store)
         */
        // const jsonStringified = JSON.stringify(film);
        // const jsonParsed = JSON.parse(jsonStringified);

        // // store item locally
        // localStorage.setItem(
        //   `favoriteFilm${jsonParsed.id}`,
        //   JSON.stringify(film),
        // );

        // // push the film in favoriteFilms
        // commit(
        //   'pushFilmInFavoriteFilms',
        //   JSON.parse(localStorage.getItem(`favoriteFilm${film.id}`)),
        // );
        /**
         * fin localStorage
         */
      } else {
        commit('removeFilmOfFavoriteFilms', foundFilm); // remove the film from favoriteFilms
        commit('setFilmAddedOrRemovedOfFavorite', 'removed'); // set filmAddedOrRemovedOfFavorite

        /**
         * début localStorage (pas besoin si createPersistedState dans index.js du store)
         */
        // localStorage.removeItem(`favoriteFilm${foundFilm.id}`);
        /**
         * fin localStorage
         */
      }
    },

    /**
     * début localStorage (pas besoin si createPersistedState dans index.js du store)
     */
    // restore all favorite films
    restoreFavoriteFilms({ commit }, film) {
      commit('pushFilmInFavoriteFilms', JSON.parse(film)); // push the film in favoriteFilms
      commit('setIsFavoriteFilmsRestored'); // set isFavoriteFilmsRestored
    },
    /**
     * fin localStorage
     */

    // set filmAddedOrRemovedOfFavorite
    changeFilmAddedOrRemovedOfFavorite({ commit }) {
      commit('setFilmAddedOrRemovedOfFavorite', null);
    },
  },

  // mutations
  mutations: {
    // push film in favoriteFilms
    pushFilmInFavoriteFilms(state, film) {
      state.favoriteFilms.push({
        id: film.id,
        title: film.title,
        poster: film.poster_path,
      });
    },

    // remove film from favoriteFilms
    removeFilmOfFavoriteFilms(state, foundFilm) {
      const favoriteFilmIndex = state.favoriteFilms.indexOf(foundFilm); // get found film's index

      // remove the film when the favoriteFilmIndex is in favoriteFilms
      if (favoriteFilmIndex > -1) {
        state.favoriteFilms.splice(favoriteFilmIndex, 1);
      }
    },

    // --- localStorage (pas besoin si createPersistedState dans index.js du store)
    // remove film from favoriteFilms
    // setIsFavoriteFilmsRestored(state) {
    //   state.isFavoriteFilmsRestored = true;
    // },

    setFilmAddedOrRemovedOfFavorite(state, value) {
      state.filmAddedOrRemovedOfFavorite = value;
    },
  },
};
