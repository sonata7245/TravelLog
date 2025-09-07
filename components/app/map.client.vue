<script lang="ts" setup>
import { CENTER_USA } from "~/lib/constants";
import { useMapStore } from "~/stores/map";

const mapStore = useMapStore();

const colorMode = useColorMode();
// const style = "https://tiles.openfreemap.org/styles/liberty";
const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty",
);
const zoom = 3;

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_USA"
    :zoom="zoom"
  >
    <MglNavigationControl />
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div
          class="tooltip toolti-top hover:cursor-pointer"
          :data-tip="point.name"
          :class="{
            'tooltip-open': mapStore.selectedPoint === point,
          }"
          @mouseenter="mapStore.selectPointWithoutFlyTo(point)"
          @mouseleave="mapStore.selectPointWithoutFlyTo(null)"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            :class="mapStore.selectedPoint === point ? 'text-accent' : 'text-primary'"
          />
        </div>
      </template>
      <mgl-popup>
        <h3 class="text-xl">
          {{ point.name }}
        </h3>
        <p>{{ point.description }}</p>
      </mgl-popup>
    </MglMarker>
  </MglMap>
</template>
