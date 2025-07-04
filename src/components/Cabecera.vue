<template>
  <header class="header">
    <img :src="perfil" alt="Nelson Gómez" class="profile-pic" />
    <div>
      <h1 class="title">Nelson Gómez</h1>
      <p class="subtitle">Frontend Developer — Valparaíso, Chile</p>

      <div class="buttons">
        <button class="btn" @click="openModal">
          <font-awesome-icon icon="file-alt" /> CV
        </button>
        <a class="btn" href="https://www.linkedin.com/in/nelson-danilo-gomez-gomez-8a6418217" target="_blank">
          <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
        </a>
        <a class="btn" href="https://github.com/NelsonDaniloGomezGomez" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']" /> GitHub
        </a>
      </div>
    </div>

    <Modal :show="showCv" :cvUrl="pdfUrl" @close="closeModal" v-if="showCv" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Modal from './Modal.vue'
import perfil from '../assets/foto-perfil.jpeg'

const showCv = ref(false)
const pdfUrl = '/portafolio/CurriculumNelsonGómez.pdf'

const openModal = () => {
  showCv.value = true
}

const closeModal = () => {
  showCv.value = false
}
</script>
