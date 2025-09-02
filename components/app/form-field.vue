<script setup lang="ts">
const props = defineProps<{
  error?: string;
  label: string;
  name: string;
  type?: string;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :name="props.name"
      :type="props.type || 'text'"
      class="w-full"
      :class="{ 'input-error': props.error,
                'input': !props.type || props.type === 'text' || props.type === 'number',
                'textarea': props.type === 'textarea',
      }"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
