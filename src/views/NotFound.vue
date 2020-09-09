<template>
  <div>
    <h1>404 error</h1>

    <p>
      Oops, the requested page was not found.
    </p>

    <div class="link">
      <router-link :to="{ name: 'home' }">&gt; Back to homepage &lt;</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
  h1 {
    margin: 20px 0;
  }

  .link {
    margin-top: 30px;
    font-weight: bold;
    color: #2c3e50;
  }
</style>
