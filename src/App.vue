<template>
  <div id="app">
    <TheHeader />
    <TheFooter />
    <router-view/>
  </div>
</template>

<script>
// import
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import '@/_reset.css';

// export
export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    min-height: 100vh;
    padding-bottom: 120px;

    h1 {
      font-size: 2em;
      font-weight: bold;
    }
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  @media (max-width: 450px) {
    #nav {
      display: none;

      // a {
      //   font-weight: bold;
      //   color: whitesmoke;

      //   &.router-link-exact-active {
      //     color: #42b983;
      //   }
      // }
    }

    .bm-item-list {
      a {
        font-weight: bold;
        color: whitesmoke;
      }

      .router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
