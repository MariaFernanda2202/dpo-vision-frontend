<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <div class="container-app">
    <AppHeader />
    <div class="content">
      <RouterView />
    </div>
    <AppFooter />

    <RouterLink />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './views/AppHeader.vue'
import AppFooter from './views/AppFooter.vue'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<style scoped>
.container-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.content {
  flex: 1;
}
</style>
