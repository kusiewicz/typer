import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import flowbiteReact from "flowbite-react/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
  },
  //https://github.com/TanStack/router/issues/4409
  ssr: {
    noExternal: [
      // "@tanstack/react-form",
    ],
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({}),
    viteReact(),
    flowbiteReact(),
  ],
});
