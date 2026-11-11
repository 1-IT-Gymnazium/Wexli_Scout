import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60_000,
  testDir: "tests/e2e",
  use: { baseURL: "http://localhost:3100" },
  webServer: { command: "npm run dev -- --port 3100", url: "http://localhost:3100", reuseExistingServer: true },
});
