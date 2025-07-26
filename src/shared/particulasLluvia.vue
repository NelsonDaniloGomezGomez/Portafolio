<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps(['isDark'])

const canvas = ref(null)
let ctx
let drops = []
let animationFrame

const dropCount = 80

class Drop {
  constructor(width, height) {
    this.reset(width, height)
  }

  reset(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.radius = 2
    this.speed = 1 + Math.random() * 1.5
    this.opacity = 0.2 + Math.random() * 0.5
  }

  update(height, width) {
    this.y += this.speed
    if (this.y > height) {
      this.y = 0
      this.x = Math.random() * width
    }
  }

  draw(ctx, darkMode) {
    ctx.beginPath()
    const color = darkMode ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, '
    ctx.fillStyle = `${color}${this.opacity})`
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

const initDrops = (width, height) => {
  drops = []
  for (let i = 0; i < dropCount; i++) {
    drops.push(new Drop(width, height))
  }
}

const animate = () => {
  const canvasEl = canvas.value
  const width = canvasEl.width
  const height = canvasEl.height

  ctx.clearRect(0, 0, width, height)

  drops.forEach(drop => {
    drop.update(height, width)
    drop.draw(ctx, props.isDark)
  })

  animationFrame = requestAnimationFrame(animate)
}

const resize = () => {
  const canvasEl = canvas.value
  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight
  initDrops(canvasEl.width, canvasEl.height)
}

onMounted(() => {
  const canvasEl = canvas.value
  ctx = canvasEl.getContext('2d')

  resize()
  window.addEventListener('resize', resize)

  animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', resize)
})

// Opcional: escuchar cambios en isDark para refrescar si necesitas
watch(() => props.isDark, () => {
  // si quieres, puedes reiniciar partículas aquí, por ejemplo
})
</script>

<template>
  <canvas ref="canvas" class="canvas-rain fixed top-0 left-0 w-full h-full z-[-1]"></canvas>
</template>

<style scoped>
.canvas-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
}
</style>
