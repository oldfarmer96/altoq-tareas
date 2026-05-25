// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import preact from "@astrojs/preact";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://altoq-tareas.vercel.app",
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [preact(), sitemap()],
  adapter: vercel(),
});