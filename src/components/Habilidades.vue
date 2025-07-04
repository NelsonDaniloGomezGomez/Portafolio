<template>
  <div class="skills-content">
    <h2>Tecnologías</h2>
    <ul class="skills-list">
      <li v-for="(skill, index) in skills" :key="index" class="skill-tag">
        <font-awesome-icon :icon="skill.icon" class="skill-icon" />
        <span class="skill-name">{{ skill.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const skills = [
  { name: 'Angular', icon: ['fab', 'angular'] },
  { name: 'Angular Material', icon: 'layer-group' },
  { name: 'TypeScript', icon: ['fab', 'js'] },
  { name: 'JavaScript', icon: ['fab', 'js'] },
  { name: 'Python', icon: ['fab', 'python'] },
  { name: 'RESTful APIs', icon: 'server' },
  { name: 'SQL Server', icon: 'database' },
  { name: 'Azure DevOps', icon: 'cloud' },
  { name: 'PrimeNG', icon: 'code' },
  { name: 'HTML-CSS-SASS', icon: ['fab', 'html5'] },
]
</script>
