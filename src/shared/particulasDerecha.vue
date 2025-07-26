<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref(null)
let ctx
let particles = []
let animationFrame

const particleCount = 200

class Particle {
  constructor(width, height) {
    this.reset(width, height)
  }

  reset(width, height) {
    this.x = width + Math.random() * 100
    this.y = Math.random() * height // Empieza desde la parte superior completa
    this.radius = Math.random() * 2 + 1
    this.speed = Math.random() * 0.5 + 0.2
    this.opacity = 0
    this.amplitude = Math.random() * 20 + 10
    this.frequency = Math.random() * 0.01 + 0.01
    this.phase = Math.random() * Math.PI * 2
  }

  update(time, width, height) {
    this.x -= this.speed
    this.y += Math.sin(time * this.frequency + this.phase) * 0.5

    const fadeZone = width * 0.3
    if (this.x < fadeZone) {
      this.opacity = this.x / fadeZone
    }

    if (this.x < -10) {
      this.reset(width, height)
    }
  }

  draw(ctx, time) {
    ctx.beginPath()
    const scale = 0.5 + Math.sin(time * this.frequency + this.phase) * 0.5
    const currentRadius = this.radius * scale
    ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.fill()
  }
}

const initParticles = (width, height) => {
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(width, height))
  }
}

const animate = (time) => {
  const canvasEl = canvas.value
  const width = canvasEl.width
  const height = canvasEl.height

  ctx.clearRect(0, 0, width, height)

  for (let p of particles) {
    p.update(time, width, height)
    p.draw(ctx, time)
  }

  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  const canvasEl = canvas.value
  const resize = () => {
    canvasEl.width = canvasEl.clientWidth
    canvasEl.height = window.innerHeight
    initParticles(canvasEl.width, canvasEl.height)
  }

  ctx = canvasEl.getContext('2d')
  resize()
  window.addEventListener('resize', resize)

  animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.particle-canvas {
  pointer-events: none;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 75vw;
  height: 100vh;
  z-index: -1;

  /* Triángulo escaleno, desde parte superior derecha hasta 3/4 de pantalla hacia la izquierda */
  clip-path: polygon(100% 100%, 100% 0%, 0% 100%);
}
</style>
