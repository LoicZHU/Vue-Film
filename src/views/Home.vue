<template>
  <div class="home">
    <h1>Lego films</h1>

    <div>
      <p>Hello everyone!</p>
      <p>In this website, all movies are listed from The Movie DataBase (TMDB) API.</p>
      <p>Enjoy!</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home {
    width: 60%;
    margin: 0 auto;

    h1 {
      margin: 20px 0 50px;
    }

    p {
      margin: 20px 0;
    }
  }

  @media (max-width: 450px) {
    .home {
      h1 {
        display: none;
      }
    }
  }
</style>
