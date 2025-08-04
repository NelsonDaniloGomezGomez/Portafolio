<script setup>
import { ref, onMounted } from "vue";
import Cabecera from "./components/Cabecera.vue";
import SobreMi from "./components/SobreMi.vue";
import Proyectos from "./components/Proyectos.vue";
import Educacion from "./components/Educacion.vue";
import PiePagina from "./components/PiePagina.vue";
import JuegoNaves from "@/components/JuegoNaves.vue";
import SvgModos from "./shared/svg-modos.vue";
import ParticulasLluvia from "./shared/particulasLluvia.vue";

import Modal from "./components/Modal.vue";

const mainContent = ref(null);
const isMobile = () => window.matchMedia("(max-width: 1024px)").matches;

const handleParallaxScroll = () => {
  if (isMobile()) {
    return;
  }

  const section = mainContent.value.querySelector(".full-section");
  if (!section) {
    return;
  }

  const scrollTop = mainContent.value.scrollTop;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.clientHeight;
  const relScroll = scrollTop - sectionTop;

  if (relScroll < 0 || relScroll > sectionHeight) {
    return;
  }

  const maxMovement = sectionHeight / 2;
  const factor = 0.3;

  section.style.transform = `translateY(${Math.min(
    relScroll * factor,
    maxMovement
  )}px)`;
};

onMounted(() => {
  const saved = localStorage.getItem("theme");
  isDark.value = saved
    ? saved === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyThemeClass(isDark.value);

  const updateScrollListener = () => {
    if (mainContent.value) {
      mainContent.value.removeEventListener("scroll", handleParallaxScroll);
      if (!isMobile()) {
        mainContent.value.addEventListener("scroll", handleParallaxScroll);
      }
    }
  };

  updateScrollListener();
  window.addEventListener("resize", updateScrollListener);
});

const isDark = ref(false);

const applyThemeClass = (isDarkMode) => {
  document.body.classList.toggle("dark", isDarkMode);
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyThemeClass(isDark.value);
};

const juegoActivo = ref(false)

const activarJuego = () => {
  juegoActivo.value = true
}

const salirDelJuego = () => {
  juegoActivo.value = false
}

</script>

<template>
  <ParticulasLluvia :isDark="isDark" />
  <!-- Mostrar juego si está activo -->
  <JuegoNaves v-if="juegoActivo" @salir="salirDelJuego" />

  <div v-if="!juegoActivo">
    <div class="app-wrapper">
      <Cabecera />

      <main ref="mainContent" class="main-content">
        <section class="full-section">
          <div class="sobre-mi">
            <SobreMi />
          </div>
        </section>

        <section class="full-section">
          <Proyectos @abrir-juego="juegoActivo = true" />
        </section>

        <section class="full-section">
          <Educacion />
        </section>
      </main>

      <PiePagina class="footer-text" />

      <SvgModos :isDark="isDark" @toggle="toggleDarkMode" />
    </div>
  </div>
</template>
