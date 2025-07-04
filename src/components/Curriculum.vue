<template>
  <Modal :show="show" @close="close">
    <h3>Currículum Vitae</h3>
    <iframe 
      :src="cvUrl" 
      width="100%" 
      height="500px" 
      style="border: none;"
    ></iframe>
    <div class="modal-btn" style="margin-top: 1rem; display: flex; gap: 1rem;">
      <a :href="cvUrl" download="CurriculumNelsonGomez.pdf" class="btn download-btn">
        <font-awesome-icon :icon="['fas', 'download']" /> Descargar CV
      </a>
      <button class="btn close-btn" @click="close">Cerrar</button>
    </div>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue'

const props = defineProps({
  show: Boolean,
  cvUrl: String
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.btn {
  cursor: pointer;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  border: none;
}

.download-btn {
  background-color: var(--color-primary, #333);
  color: white;
  border: 1px solid var(--color-primary, #333);
}

.download-btn:hover {
  background-color: var(--color-primary-hover, #555);
}

.close-btn {
  background-color: transparent;
  color: inherit;
  border: 1px solid #999;
}

.close-btn:hover {
  background-color: rgba(0,0,0,0.05);
}
</style>
