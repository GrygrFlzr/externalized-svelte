import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { Generator } from "@jspm/generator";

const externalized = new Set();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    svelte({
      compilerOptions: {
        runes: true,
      },
    }),
    {
      name: "vite-plugin-svelte-external",
      transformIndexHtml: {
        order: "post",
        handler:
          mode === "production"
            ? async (html) => {
                const generator = new Generator({
                  env: ["production", "browser", "module"],
                });
                for (const id of externalized) {
                  await generator.install(id);
                }
                return await generator.htmlInject(html, {
                  esModuleShims: true,
                  integrity: true,
                  preload: true,
                });
              }
            : (html) => html,
      },
    },
  ],
  build: {
    rollupOptions: {
      external(id) {
        if (id === "svelte" || id.startsWith("svelte/")) {
          externalized.add(id);
          return true;
        }
        return false;
      },
    },
  },
}));
