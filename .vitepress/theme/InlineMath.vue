<script setup lang="ts">
import { computed } from "vue";
import katex from "katex";

const props = defineProps<{
  formula: string;
}>();

const html = computed(() =>
  katex.renderToString(props.formula, {
    throwOnError: false,
    strict: "ignore",
    displayMode: false,
  }),
);
</script>

<template>
  <span v-html="html"></span>
</template>

