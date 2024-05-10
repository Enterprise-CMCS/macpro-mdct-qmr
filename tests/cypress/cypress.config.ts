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
  env: {
    STATE_USER_3: "stateuser3@test.com",
    STATE_USER_4: "stateuser4@test.com",
    ADMIN_USER: "adminuser@test.com",
  },
  e2e: {
    setupNodeEvents,
    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/e2e/**/*.spec.ts",
    supportFile: "support/index.js",
  },
});
