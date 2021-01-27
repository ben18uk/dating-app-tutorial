<template>
  <Playground></Playground>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Playground from './components/Playground.vue'

export default defineComponent({
  name: 'App',
  components: {
    Playground
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>