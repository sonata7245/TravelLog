<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { InsertLocation } from "~/lib/db/schema";

const router = useRouter();
const submitError = ref("");

const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch("/api/locations", {
      method: "post",
      body: values,
    });
  }
  catch (e) {
    const error = e as FetchError;
    submitError.value = error.statusMessage || "An Uknown Error Occurred.";
  }
});

onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave, all unsaved changes will be lost");
    if (!confirm) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, contry, state, or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>
    <div v-if="submitError" role="alert" class="alert alert-error">
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField name="name" label="Name" :error="errors.name" />
      <AppFormField
        name="description"
        label="Description"
        type="textarea"
        :error="errors.description"
      />
      <AppFormField
        name="lat"
        label="Latitude"
        type="number"
        :error="errors.lat"
      />
      <AppFormField
        name="long"
        label="Longitude"
        type="number"
        :error="errors.long"
      />

      <div class="flex justify-end gap-2">
        <button type="button" class="btn btn-outline" @click="router.back()">
          <Icon name="tabler:arrow-left" /> Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          Add <Icon name="tabler:plus" />
        </button>
      </div>
    </form>
  </div>
</template>
