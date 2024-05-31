import { defineConfig } from "cypress";
import setupNodeEvents from "./plugins";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

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
    STATE_USER_2: process.env.CYPRESS_STATE_USER_2,
    STATE_USER_4: process.env.CYPRESS_STATE_USER_4,
    ADMIN_USER: process.env.CYPRESS_ADMIN_USER,
    QMR_PASSWORD: process.env.CYPRESS_QMR_PASSWORD,
  },
  e2e: {
    setupNodeEvents,
    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/e2e/**/*.spec.ts",
    supportFile: "support/index.js",
  },
});
