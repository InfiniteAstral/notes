<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  href: String,
  text: {
    type: String,
    default: ''
  }
})

const finalHref = computed(() => withBase(props.href))
</script>

<template>
  <div class="course-link-container">
    <a :href="finalHref" class="course-link">
      进入 {{ text }}
      <span>
        →
      </span>
    </a>
  </div>
</template>

<style scoped>
.course-link-container {
  text-align: end;
}

.course-link {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.course-link:hover {
  background-color: var(--vp-c-brand-1);
  color: #fff;
}
</style>