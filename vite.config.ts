import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Guard against Node 20.16 webstreams adapter race condition when connection closes abruptly
if (typeof process !== "undefined" && typeof process.on === "function") {
  process.on("uncaughtException", (err: unknown) => {
    if (
      err &&
      typeof err === "object" &&
      (("code" in err && err.code === "ERR_INVALID_STATE") ||
        ("message" in err &&
          typeof err.message === "string" &&
          err.message.includes("Controller is already closed")))
    ) {
      return;
    }
    console.error("Uncaught exception in Vite process:", err);
  });
}

export default defineConfig({
  server: {
    host: true,
    port: Number(process.env.PORT) || 8080,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    nitro(),
    viteReact(),
  ],
});

