<template>
  <label class="switch-toggle">
    <input type="checkbox" :checked="isDark" @change="toggle" />
    <span class="slider">
      <span class="icon left">
        <!-- Luna -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="34" height="34">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </span>
      <span class="icon right">
        <!-- Sol -->
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FDB813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="6" fill="#FFD93B" stroke="none"/>
        </svg>
      </span>
    </span>
  </label>
</template>

<script setup>
const emit = defineEmits(['toggle'])
defineProps({ isDark: Boolean })

const toggle = () => {
  emit('toggle')
}
</script>