import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Permite `@use "tokens" as *;` em qualquer módulo sem caminho relativo.
        loadPaths: [path.resolve(import.meta.dirname, "app/styles")],
      },
    },
  },
});
