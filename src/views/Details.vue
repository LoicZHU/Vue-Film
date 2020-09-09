<template>
  <div>
    <div class="film">
      <img v-if="film.poster_path" class="film__poster" :src="`https://image.tmdb.org/t/p/w185/${film.poster_path}`" alt="">
      <img v-if="!film.poster_path" class="film__poster" alt="(no poster)">

      <div class="film__info">
        <h1>{{ film.title }}</h1>
        <div>
          <b>Original language: </b>
          {{ film.original_language ? film.original_language : '-' }}
        </div>
        <div>
          <b>Public rating:</b>
          {{ film.vote_average ? `${film.vote_average} / 10` : '-' }}
        </div>
        <div>
          <b>Release:</b>
          {{ film.release_date ? formatDate(film.release_date) : '-' }}
          </div>
        <p>
          <b>Overview:</b>
          {{ film.overview ? film.overview : '-'}}
        </p>
      </div>
    </div>

    <router-link to ='/list'>
      <span class="list-link">&gt; Go to films list &lt;</span>
    </router-link>
  </div>
</template>

<script>
// import
import { mapState } from 'vuex';
import slugify from 'slugify';
import moment from 'moment';

// export
export default {

  data() {
    return {
      filmInfos: null,
    };
  },

  // props
  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  // computed
  computed: {
    ...mapState({
      filmsApiPages: (state) => state.films.filmsApiPages,
    }),

    film() {
      const filmInfoArray = this.filmsApiPages.find(
        (filmsPage) => filmsPage.find(
          (film) => slugify(film.title, { remove: /[*+~.()!:]/, lower: true }) === this.slug,
        ),
      );

      return filmInfoArray.find((film) => (
        slugify(film.title, { remove: /[*+~.()!:]/, lower: true }) === this.slug
      ));
    },
  },

  // methods
  methods: {
    // slug url
    slugify,

    // formate date
    formatDate(date) {
      if (date) {
        return (
          moment(String(date))
            .locale('en')
            .format('MMMM DD, YYYY')
        );
      }

      return 'Date inconnue';
    },
  },
};
</script>

<style scoped lang="scss">
  .film {
    display: flex;
    width: 80%;
    margin: 20px auto 20px;

    &__poster {
      display: block;
      margin-right: 20px;
      width: 20%;
    }

    &__info {
      width: 80%;

      h1 {
        margin: 20px;
      }

      div, p {
        margin: 15px;
        text-align: left;
      }

      b {
        font-weight: bold;
      }
    }
  }

  .list-link {
    font-weight: bold;
  }

  @media (max-width: 450px) {
    .film {
      display: block;
      width: 80%;
      margin: 20px auto 20px;

      &__poster {
        margin: 0 auto;
        width: 50%;
      }

      &__info {
        width: 100%;

        h1 {
          margin: 20px;
        }

        div, p {
          margin: 15px;
        }

        b {
          font-weight: bold;
        }
      }
    }

    .list-link {
      font-weight: bold;
    }
  }
</style>
