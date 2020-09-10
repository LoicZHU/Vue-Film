<template>
  <div>
    <div v-if="filmsApiPages.length === 0">
      Loading...
    </div>

    <div v-if="filmsApiPages.length > 0">
      <notifications group="foo" position="top left" width="200" />

      <h1>Discover a list of Lego films!</h1>

      <div v-for="filmsPage in filmsApiPages" :key="filmsPage.id" class="container">
        <div v-for="film in filmsPage" :key="film.id" class="container__film">
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
            <img v-if="film.poster_path" class="container__film__image" :src="`https://image.tmdb.org/t/p/w185/${film.poster_path}`" alt="">
            <img v-if="!film.poster_path" alt="(no poster)">
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

    <button v-if="(currentApiPage <= totalApiPages)" @click="fetchFilms">
      {{ `load more (${currentApiPage-1} / ${totalApiPages})` }}
    </button>

    <!-- <router-link v-if="(filmsApiPages.length > 0)" :to="{
        name: 'list',
        params: {
          pageNumber: String(this.currentUserFilmPage),
        },
      }"> -->
      <!-- <paginate
        :page-count="totalApiPages"
        :page-range="3"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="''">
      </paginate> -->
    <!-- </router-link> -->
  </div>
</template>

<script>
// import
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
// import Paginate from 'vuejs-paginate';

// export
export default {
  // components
  components: {
    // Paginate,
  },

  // data
  data() {
    return {
    };
  },

  // computed
  computed: {
    // map films state
    ...mapState({
      isApiFetchedAtLeastOnce: (state) => state.films.isApiFetchedAtLeastOnce,
      filmsApiPages: (state) => state.films.filmsApiPages,
      currentApiPage: (state) => state.films.currentApiPage,
      totalApiPages: (state) => state.films.totalApiPages,
    }),

    // map favorite state
    ...mapState({
      favoriteFilms: (state) => state.favorite.favoriteFilms,
      filmAddedOrRemovedOfFavorite: (state) => state.favorite.filmAddedOrRemovedOfFavorite,
    }),
  },

  // lifecycle
  created() {
    if (!this.isApiFetchedAtLeastOnce) {
      this.fetchFilms();
    }

    //
    if (this.filmAddedOrRemovedOfFavorite !== null) {
      this.changeFilmAddedOrRemovedOfFavorite(null);
    }
  },

  // methods
  methods: {
    slugify,

    // map films actions
    ...mapActions({
      fetchFilms: 'films/fetchFilms',
    }),

    // map favorite actions
    ...mapActions({
      addOrRemoveFilmOfFavorite: 'favorite/addOrRemoveFilmOfFavorite',
      changeFilmAddedOrRemovedOfFavorite: 'favorite/changeFilmAddedOrRemovedOfFavorite',
    }),

    // handlePaginateClick(pageNumber) {
    //   this.setCurrentPage();
    //   this.changeCurrentUserFilmPage(pageNumber);
    // },

    // setCurrentPage(pageNumber) {
    //   this.currentPage = pageNumber - 1;
    // },

    addOrRemoveOfFavorites(film) {
      this.addOrRemoveFilmOfFavorite(film);
      this.showToast();
    },

    showToast() {
      // when film is added, a notification is showed
      if (this.filmAddedOrRemovedOfFavorite === 'added') {
        this.$notify({
          group: 'foo',
          title: 'Notification:',
          text: 'Film is added to favorites!',
          type: 'success',
        });
        // when film is removed, a notification is showed
      } else if (this.filmAddedOrRemovedOfFavorite === 'removed') {
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
