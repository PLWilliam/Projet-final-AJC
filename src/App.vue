<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <!-- <RouterLink to="/">Connexion </RouterLink> -->
        <RouterLink to="/">Home </RouterLink>
        <RouterLink to="/read">read </RouterLink>
        <RouterLink to="/create">create </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
