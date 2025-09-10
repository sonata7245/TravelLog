<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;
</script>

<template>
  <h2>{{ slug }}</h2>
</template>
