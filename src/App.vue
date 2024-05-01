<script setup lang="ts">
import {RouterView} from 'vue-router'
import Logo from './assets/logo.png';
</script>

<template>
  <header>
    <img :src="Logo" alt="logo" class="h-full">
  </header>

  <RouterView/>
</template>

<style lang="scss" scoped>
header {
  padding: 24px 40px;
  height: 144px;
  width: 100%;

  @media screen and (max-width: 1000px) {
    padding: 16px;
    height: 72px;
  }
}
</style>
