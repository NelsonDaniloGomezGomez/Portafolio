<template>
  <div>
    <h2>Proyectos</h2>
    <ul>
      <li v-for="proyecto in proyectos" :key="proyecto.titulo">
        <strong>{{ proyecto.titulo }}</strong><br />
        <button @click="ir(proyecto.url)">🔗 Ver proyecto</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const proyectos = [
  { titulo: 'Crypto App', url: 'https://misitio.com/crypto' },
  { titulo: 'ToDo App', url: 'https://misitio.com/todo' },
  { titulo: 'Mi Tienda Online', url: 'https://misitio.com/tienda' }
]

function ir(url) {
  window.open(url, '_blank')
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
button {
  margin-top: 5px;
}
</style>
