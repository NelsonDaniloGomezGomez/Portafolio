<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-btn" @click="close">X</button>
      <h3>Currículum Vitae</h3>
      
      <!-- Vista previa del PDF -->
        <iframe :src="cvUrl" ...></iframe>
        <a :href="cvUrl" download="CV-Nelson.pdf" ...>Descargar CV</a>
      
      <a :href="pdfUrl" download="CV-Nelson.pdf" class="btn download-btn">Descargar CV</a>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  cvUrl: String,
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 1rem;
  width: 90%;
  max-width: 700px;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.download-btn {
  display: inline-block;
  margin-top: 1rem;
}
</style>
