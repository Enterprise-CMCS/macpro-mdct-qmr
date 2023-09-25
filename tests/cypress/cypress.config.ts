import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "fixtures",
  screenshotsFolder: "screenshots",
  video: false,
  videosFolder: "videos",
  downloadsFolder: "downloads",
  defaultCommandTimeout: 15000,
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome" && browser.isHeadless) {
          launchOptions.args.push("--window-size=1400,9000");
          launchOptions.args.push("--force-device-scale-factor=1");
        }
        return launchOptions;
      });

      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        },
      });
    },
    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/e2e/**/*.spec.ts",
    supportFile: "support/index.js",
  },
});
