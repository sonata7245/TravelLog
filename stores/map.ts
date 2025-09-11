import type { LngLatBounds } from "maplibre-gl";

import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);
  const shouldFlyTo = ref(true);
  const addedPoint = ref<MapPoint & { centerMap?: boolean } | null>(null);

  function selectPointWithoutFlyTo(point: MapPoint | null) {
    shouldFlyTo.value = false;
    selectedPoint.value = point;
  }

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();
    let bounds: LngLatBounds | null;
    const padding = 60;

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint) {
        return;
      }
      bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding,
        maxZoom: 10,
      });
    });

    effect(() => {
      if (addedPoint.value)
        return;
      if (selectedPoint.value) {
        if (shouldFlyTo.value) {
          map.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],
            zoom: 10,
            speed: 0.5,
            essential: true,
          });
        }
        else {
          shouldFlyTo.value = true;
        }
      }
      else if (bounds) {
        map.map?.fitBounds(bounds, {
          padding,
          maxZoom: 10,
        });
      }
    });
    watch(addedPoint, (newValue, oldValue) => {
      if ((newValue && !oldValue) || newValue?.centerMap) {
        map.map?.flyTo({
          center: [newValue.long, newValue.lat],
          speed: 0.8,
          zoom: 6,
        });
      }
    }, {
      immediate: true,
    });
  };

  return {
    init,
    mapPoints,
    selectedPoint,
    selectPointWithoutFlyTo,
    addedPoint,
  };
});
