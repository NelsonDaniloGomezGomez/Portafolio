<template>
  <div class="particle-container">
    <div
      v-for="(particle, index) in particles"
      :key="index"
      class="particle"
      :style="{
        top: `${particle.y}px`,
        left: `${particle.x}px`,
        animationDelay: `${particle.delay}s`,
        animationDuration: `${particle.duration}s`,
        opacity: particle.opacity,
      }"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const particles = ref([])

const createParticles = () => {
  const total = 30
  const screenHeight = window.innerHeight
  const containerWidth = window.innerWidth / 3
  for (let i = 0; i < total; i++) {
    particles.value.push({
      x: 0,
      y: Math.random() * screenHeight,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.5,
    })
  }
}

onMounted(() => {
  createParticles()
})
</script>

<style scoped>
.particle-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 33vw;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation-name: moveRight;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes moveRight {
  0% {
    transform: translateX(0px) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(50vw) scale(1.5);
    opacity: 0.6;
  }
  100% {
    transform: translateX(100vw) scale(1);
    opacity: 0;
  }
}
</style>
