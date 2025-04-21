import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { execSync } from "child_process";

// Get the latest Git commit hash, summary, and description
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
const commitSummary = execSync("git log -1 --pretty=%s").toString().trim();
const commitDescription = execSync("git log -1 --pretty=%b").toString().trim(); // Get the commit description

export default defineConfig({
  base: "/rick-muda-portfolio-vue.js/", // Replace with your repository name
  plugins: [vue()],
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash), // Inject the commit hash
    __COMMIT_SUMMARY__: JSON.stringify(commitSummary), // Inject the commit summary
    __COMMIT_DESCRIPTION__: JSON.stringify(commitDescription), // Inject the commit description
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
