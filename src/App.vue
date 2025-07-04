<script setup>
import { ref, onMounted } from 'vue'
import Cabecera from './components/Cabecera.vue'
import SobreMi from './components/SobreMi.vue'
import Habilidades from './components/Habilidades.vue'
import Proyectos from './components/Proyectos.vue'
import Educacion from './components/Educacion.vue'
import PiePagina from './components/PiePagina.vue'
import Modal from './components/Modal.vue'

const mainContent = ref(null)
const handleParallaxScroll = () => {
  const scrollTop = mainContent.value.scrollTop
  const section = mainContent.value.querySelector('.parallax-section')
  const sectionTop = section.offsetTop
  const sectionHeight = section.clientHeight

  // Calcula cuánto hemos scrolleado dentro de la sección
  const relScroll = scrollTop - sectionTop
  if (relScroll < 0 || relScroll > sectionHeight) {
    // Si aún no hemos llegado o ya pasamos de la sección, no debería mover nada
    return
  }

  const sobreMiLayer = section.querySelector('.sobre-mi')
  const habilidadesLayer = section.querySelector('.habilidades')

  // Ajusta las velocidades: SobreMi más lento, Habilidades un poco más rápido
  const maxMovement = sectionHeight / 2  // por ejemplo limitamos el movimiento
  const factorSobreMi = 0.3
  const factorHabilidades = 0.6

  sobreMiLayer.style.transform = 
    `translateY(${Math.min(relScroll * factorSobreMi, maxMovement)}px)`
  habilidadesLayer.style.transform = 
    `translateY(${Math.min(relScroll * factorHabilidades, maxMovement)}px)`
}
onMounted(() => {
  mainContent.value.addEventListener('scroll', handleParallaxScroll)
})

const isDark = ref(false)

const applyThemeClass = (isDarkMode) => {
  document.body.classList.toggle('dark', isDarkMode)
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  applyThemeClass(isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyThemeClass(isDark.value)
})

onMounted(() => {
  if (mainContent.value) {
    mainContent.value.addEventListener('scroll', handleParallaxScroll)
  }
})

</script>

<template>
  <div class="app-wrapper">
    <Cabecera class="header" />

    <main ref="mainContent" class="main-content">
      <section class="full-section parallax-section">
        <div class="parallax-layer sobre-mi">
          <SobreMi />
        </div>
        <div class="parallax-layer habilidades">
          <Habilidades />
        </div>
      </section>

      <section class="full-section">
        <Proyectos />
      </section>

      <section class="full-section">
        <Educacion />
      </section>
    </main>


    <PiePagina class="footer-text" />

    <button @click="toggleDarkMode" class="btn toggle">
      <font-awesome-icon icon="adjust" /> Cambiar modo
    </button>
  </div>
</template>
