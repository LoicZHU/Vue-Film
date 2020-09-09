<template>
  <div>
    <nav id="nav">
      <ul>
        <li>
          <router-link to ='/'>Home</router-link>
        </li>
        <li>
          <router-link to ='/list'>Films</router-link>
        </li>
        <li>
          <router-link to ='/favorites'>Your favorite films</router-link>
        </li>
      </ul>
    </nav>

    <div class="logo">
      <router-link to ='/'>Lego films</router-link>
    </div>

    <Slide right width="150" noOverlay :closeOnNavigation="true" >
      <router-link to ='/'>Home</router-link>
      <router-link to ='/list'>Films</router-link>
      <router-link to ='/favorites'>Favorites</router-link>
    </Slide>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu';

export default {
  // components
  components: {
    Slide,
  },
};
</script>

<style scoped lang="scss">
  #nav {
    background-color: whitesmoke;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
    z-index: 1;

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      display: inline-block;
      margin: 0 10px;
    }
  }

  .logo {
    display: none;
  }

  @media (max-width: 450px) {
    #nav {
      display: none;
    }

    .logo {
      display: block;
      color: yellowgreen;
      font-weight: bold;
      font-size: 1.5em;
      background-color: whitesmoke;
      padding: 40px;
      text-align: left;
    }
  }
</style>
