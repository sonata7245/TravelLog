// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-csurf",
    "nuxt-maplibre",
  ],
  css: ["../assets/css/main.css"],
  eslint: {
    config: {
      standalone: false,
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        "maplibre-gl",
      ],
    },
  },
  colorMode: {
    dataValue: "theme",
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000, // Or your desired port
  },
});
