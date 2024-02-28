import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        runes: true,
      },
    }),
  ],
  build: {
    // oldest browsers with >0.5% usage
    target: ["chrome109", "safari15.8", "firefox121"],
    rollupOptions: {
      input: {
        index: "index.html",
      },
      external(source) {
        return source === "svelte" || source.indexOf("svelte/") === 0;
      },
    },
  },
});
