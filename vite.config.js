import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

function copyFlowerPage() {
  return {
    name: "copy-flower-page",
    closeBundle() {
      copyFileSync(resolve(__dirname, "flower.html"), resolve(__dirname, "dist", "flower.html"));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyFlowerPage()],
});
