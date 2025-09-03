<template>
  <fa :icon="['fas', name]" />
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "gear",
  },
});
</script>
