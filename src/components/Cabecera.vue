<template>
  <header class="header">
    <img :src="perfil" alt="Foto de perfil de Nelson Gómez" class="profile-pic" />
    <div>
      <h1 class="title">Nelson Gómez</h1>
      <p class="subtitle">Frontend Developer — Valparaíso, Chile</p>

      <div class="buttons buttons-mobile">
        <button class="btn" @click="openModal" aria-label="Abrir Currículum Vitae">
          <font-awesome-icon :icon="['fas', 'file-alt']" />
          <span class="sr-only">Abrir Currículum Vitae</span>
          <span>CV</span> 
        </button>

        <a
          class="btn"
          href="https://www.linkedin.com/in/nelson-danilo-gomez-gomez-8a6418217"
          target="_blank"
          aria-label="Visitar perfil de LinkedIn de Nelson Gómez"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" />
          <span>LinkedIn</span>
        </a>

        <a
          class="btn"
          href="https://github.com/NelsonDaniloGomezGomez"
          target="_blank"
          aria-label="Visitar perfil de GitHub de Nelson Gómez"
        >
          <font-awesome-icon :icon="['fab', 'github']" />
          <span>GitHub</span>
        </a>
      </div>
    </div>

    <Modal :show="showCv" @close="closeModal">
      <h3 id="cv-title">Currículum Vitae</h3>
      <iframe
        :src="pdfUrl"
        width="100%"
        height="500px"
        style="border:none;"
        title="Currículum Vitae de Nelson Gómez"
        aria-labelledby="cv-title"
      ></iframe>

      <div class="modal-btn" style="margin-top: 1rem; display: flex; gap: 1rem; justify-content:center;">
        <a :href="pdfUrl" download="CurriculumNelsonGomez.pdf" class="btn download-btn" aria-label="Descargar Currículum Vitae">
          <font-awesome-icon :icon="['fas', 'download']" />
          <span>Descargar CV</span>
        </a>
        <button class="btn close-btn" @click="closeModal" aria-label="Cerrar modal del Currículum Vitae">
          Cerrar
        </button>
      </div>
    </Modal>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'
import perfil from '../assets/foto-perfil.jpeg'

const showCv = ref(false)
const pdfUrl = '/Portafolio/CurriculumNelsonGomez.pdf'

const openModal = () => {
  showCv.value = true
}

const closeModal = () => {
  showCv.value = false
}
</script>
