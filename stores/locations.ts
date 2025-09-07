import { useMapStore } from "./map";

export const useLocationStore = defineStore("useLocationStore", () => {
  const { data, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value) {
      sidebarStore.loading = false;
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: "#",
        location,
      }));
      mapStore.mapPoints = data.value;
    }
    else {
      sidebarStore.loading = status.value === "pending";
    }
  });

  return {
    locations: data,
    status,
    refresh,
  };
});
