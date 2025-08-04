<template>
  <div>
    <h2>Proyectos</h2>
    <ul class="project-list">
      <li v-for="(proyecto, index) in proyectos" :key="index">
        <span class="project-name" aria-label="Nombre del proyecto"
          >{{ proyecto.nombre }}:</span
        >
        <span class="intro-text skills-content">
          {{ proyecto.descripcion }}
          <ul class="skills-list">
            <li
              v-for="(tech, i) in proyecto.tecnologias"
              :key="i"
              class="skill-tag"
            >
              <font-awesome-icon
                :icon="tech.icon"
                class="skill-icon"
                aria-hidden="true"
                focusable="false"
              />
              <span class="skill-name">{{ tech.name }}</span>
            </li>
          </ul>
          <br v-if="proyecto.jugable" />
          <div v-if="proyecto.jugable" class="center">
          <button
            @click="$emit('abrir-juego')"
            class="btn-jugar"
            aria-label="Jugar proyecto"
          >
            <font-awesome-icon icon="gamepad" style="margin-right: 0.4em;" />
            <span>Jugar</span>
          </button>
          </div>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const proyectos = [
  {
    nombre: "Gestor de Proyectos",
    descripcion:
      "Plataforma desarrollada con React en el frontend y .NET en el backend para facilitar la planificación, seguimiento y administración eficiente de proyectos.",
    tecnologias: [
      { name: "React", icon: ["fab", "react"] },
      { name: ".NET", icon: "code" },
    ],
    jugable: false,
  },
  {
    nombre: "Bot de Trading Crypto",
    descripcion:
      "Bot desarrollado en Python con Flask en el backend, y React en el frontend para el análisis, compra y venta automática de criptomonedas utilizando la métrica RSI.",
    tecnologias: [
      { name: "Python", icon: ["fab", "python"] },
      { name: "Flask", icon: "server" },
      { name: "React", icon: ["fab", "react"] },
    ],
    jugable: false,
  },
  {
    nombre: "Juego de Navecitas",
    descripcion:
      "Juego interactivo desarrollado con Vue donde controlas una nave espacial para eliminar enemigos y un jefe final. Ideal para aprender y divertirse con conceptos básicos de programación y animación web.",
    tecnologias: [
      { name: "Vue", icon: ["fab", "vuejs"] },
      { name: "JavaScript", icon: ["fab", "js"] },
    ],
    jugable: true,
  },
];
</script>
