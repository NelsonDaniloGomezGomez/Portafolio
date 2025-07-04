<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click="close">
      <div class="modal-content" @click.stop>
        <h3>Currículum Vitae</h3>
        <iframe 
  :src="cvUrl" 
  width="100%" 
  height="500px" 
  style="border: none;"
></iframe>
<div class="modal-btn">
          <a :href="cvUrl" download class="btn download-btn">
            <font-awesome-icon icon="file-download" /> Descargar CV
          </a>
          <button class="btn close-btn" @click="close">Cerrar</button>
        </div>

      </div>
    </div>
  </Teleport>
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
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

body.dark .modal-content {
  background: #333;
  color: #c3c3c3;
}

.modal-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.modal-btn a,
.modal-btn .close-btn {
  min-width: 160px;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.download-btn {
  border: 1px solid var(--color-primary, #333);
  background-color: var(--color-primary, #333);
  color: white;
}

.download-btn:hover {
  background-color: var(--color-primary-hover, #555);
}

.close-btn {
  border: 1px solid #999;
  background-color: transparent;
  color: inherit;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
