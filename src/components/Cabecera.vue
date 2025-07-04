<template>
  <header class="header">
    <img :src="perfil" alt="Nelson Gómez" class="profile-pic" />
    <div>
      <h1 class="title">Nelson Gómez</h1>
      <p class="subtitle">Frontend Developer — Valparaíso, Chile</p>

      <div class="buttons">
        <button class="btn" @click="openModal">
          <font-awesome-icon :icon="['fas', 'file-alt']" /> CV
        </button>
        <a class="btn" href="https://www.linkedin.com/in/nelson-danilo-gomez-gomez-8a6418217" target="_blank">
          <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
        </a>
        <a class="btn" href="https://github.com/NelsonDaniloGomezGomez" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']" /> GitHub
        </a>
      </div>
    </div>

    <Modal :show="showCv" @close="closeModal">
      <!-- Contenido slot del modal -->
      <h3>Currículum Vitae</h3>
      <iframe :src="pdfUrl" width="100%" height="500px" style="border:none;"></iframe>
      <div class="modal-btn" style="margin-top: 1rem; display: flex; gap: 1rem; justify-content:center;">
        <a :href="pdfUrl" download="CurriculumNelsonGomez.pdf" class="btn download-btn">
          <font-awesome-icon :icon="['fas', 'download']" /> Descargar CV
        </a>
        <button class="btn close-btn" @click="closeModal">Cerrar</button>
      </div>
    </Modal>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'
import perfil from '../assets/foto-perfil.jpeg'

const showCv = ref(false)
const pdfUrl = '/CurriculumNelsonGomez.pdf'

const openModal = () => {
  showCv.value = true
}

const closeModal = () => {
  showCv.value = false
}
</script>
