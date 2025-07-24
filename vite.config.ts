import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  //https://github.com/TanStack/router/issues/4409
  ssr: {
    noExternal: [
      "@tanstack/react-form",
      // "@supabase/auth-ui-react",
      // "@supabase/auth-ui-shared",
      // "@supabase/ssr",
      // "@supabase/supabase-js",
    ],
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({}),
  ],
});
