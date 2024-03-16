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
                return html.replace(
                  '<script type="importmap"></script>',
                  `<script type="importmap">${JSON.stringify(
                    generator.getMap()
                  )}</script><!-- ES Module Shims: Import maps polyfill for older browsers without import maps support (eg Safari 16.3) --><script async src="https://ga.jspm.io/npm:es-module-shims@1.8.3/dist/es-module-shims.js" crossorigin="anonymous"></script>`
                );
              }
            : (html) => html,
      },
    },
  ],
  build: {
    // oldest browsers with >0.5% usage
    target: ["chrome109", "safari15.8", "firefox121"],
    rollupOptions: {
      external(id) {
        if (id === "svelte" || id.indexOf("svelte/") === 0) {
          externalized.add(id);
          return true;
        }
        return false;
      },
    },
  },
}));
