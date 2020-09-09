<template>
  <div>
    <div v-if="favoriteFilms.length === 0">
      No favorite film.
    </div>

    <div v-if="favoriteFilms.length === 0" class="no-favorite">
      <h1>Your favorites list</h1>

      <div class="container">
        <notifications group="foo" position="top left" width="200" />

        <div v-for="film in favoriteFilms" :key="film.id" class="container__film">
            <router-link
              :to="{
                name: 'details',
                params: {
                  slug: slugify(film.title, {
                    remove: /[*+~.()!:]/,
                    lower: true,
                  }),
                },
              }"
            >
              <img v-if="film.poster" class="container__film__image" :src="`https://image.tmdb.org/t/p/w185/${film.poster}`" alt="">
              <img v-if="!film.poster" alt="(no poster)">
              <br>
              <div class="container__film__title">
                {{ film.title }}
              </div>
            </router-link>

            <button class="favorite-button" @click="addOrRemoveOfFavorites(film)">
              {{ favoriteFilms.some((favoriteFilm) => favoriteFilm.id === film.id)
            ? 'Remove from favorites'
              : 'Add to favorites'
              }}
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';

// export
export default {
  // components
  components: {
  },

  // data
  data() {
    return {
    };
  },

  // computed
  computed: {
    // map favorite state
    ...mapState({
      favoriteFilms: (state) => state.favorite.favoriteFilms,
      isFavoriteFilmsRestored: (state) => state.favorite.isFavoriteFilmsRestored,
      filmAddedOrRemovedOfFavorite: (state) => state.favorite.filmAddedOrRemovedOfFavorite,
    }),
  },

  // lifecycle
  created() {
    /**
     * début localStorage
     * handle localStorage (pas besoin si createPersistedState dans index.js du store)
     */
    // restore the favorites films if they are not already restored
    // if (!this.isFavoriteFilmsRestored && this.favoriteFilms.length === 0) {
    //   console.log('FAVORITE: CREATED CYCLE');
    //   const films = Object.keys(localStorage); // get all localStorage keys

    //   // restore every localStorage items / films
    //   for (let i = 0; i < films.length - 1; i += 1) {
    //     const film = localStorage.getItem(films[i]);

    //     this.restoreFavoriteFilms(film);
    //   }
    // }
    /**
     * fin localStorage
     */
  },

  // methods
  methods: {
    slugify,

    // map favorite actions
    ...mapActions({
      addOrRemoveFilmOfFavorite: 'favorite/addOrRemoveFilmOfFavorite',
      restoreFavoriteFilms: 'favorite/restoreFavoriteFilms',
    }),

    addOrRemoveOfFavorites(film) {
      this.addOrRemoveFilmOfFavorite(film);
      this.showToast();
    },

    showToast() {
      // when film is added, a notification is showed
      if (this.filmAddedOrRemovedOfFavorite === 'removed') {
        this.$notify({
          group: 'foo',
          title: 'Notification:',
          text: 'Film is removed from favorites!',
          type: 'warn',
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .no-favorite {
    margin-top: 20px;
  }

  h1 {
    margin: 20px 0;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &__film {
      background-color: #c3dafe;
      padding: 10px;
      width: 25%;
      margin: 10px;
      position: relative;

      &:hover {
        background-color: #6367ac;

        .container__film__image {
          opacity: 0.5;
        }

        .container__film__title {
          color: whitesmoke;
        }

        .favorite-button {
          opacity: 1;
        }
      }

      img {
        width: 50%;
      }

      &__title {
        margin-top: 10px;
      }
    }

    .favorite-button {
      background-color: #bee3f8;
      border: none;
      padding: 6px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
   }

   @media (max-width: 450px) {
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        &__film {
          background-color: #c3dafe;
          padding: 10px;
          width: 40%;
          margin: 10px;
          position: relative;

          &:hover {
            background-color: #6367ac;

            .container__film__image {
              opacity: 0.5;
            }

            .container__film__title {
              color: whitesmoke;
            }

            .favorite-button {
              opacity: 1;
            }
          }

          img {
            width: 50%;
          }

          &__title {
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>
