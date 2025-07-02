<template>
  <div class="container">
    <h1>Hola, soy Nelson 👋</h1>
    <p>Desarrollador frontend especializado en Vue y Angular.</p>
    <Proyectos />
  </div>
</template>

<script setup>
import Proyectos from './components/Proyectos.vue'
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
  font-family: sans-serif;
}
</style>
