import { defineConfig } from "cypress";
import setupNodeEvents from "./plugins";

export default defineConfig({
  redirectionLimit: 20,
  retries: 2,
  watchForFileChanges: true,
  fixturesFolder: "fixtures",
  screenshotsFolder: "screenshots",
  video: false,
  videosFolder: "videos",
  downloadsFolder: "downloads",
  defaultCommandTimeout: 15000,
  e2e: {
    setupNodeEvents,
    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/e2e/**/*.spec.ts",
    supportFile: "support/index.js",
  },
});
