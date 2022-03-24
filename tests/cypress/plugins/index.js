const cucumber = require("cypress-cucumber-preprocessor").default;
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  // set default size for headless mode
  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.name === "chrome" && browser.isHeadless) {
      launchOptions.args.push("--window-size=1400,1200");
      launchOptions.args.push("--force-device-scale-factor=1");
    }
    if (browser.name === "electron" && browser.isHeadless) {
      // fullPage screenshot size is 1400x1200
      launchOptions.preferences.width = 1400;
      launchOptions.preferences.height = 1200;
    }

    if (browser.name === "firefox" && browser.isHeadless) {
      // menubars take up height on the screen
      // so fullPage screenshot size is 1400x1126
      launchOptions.args.push("--width=1400");
      launchOptions.args.push("--height=1200");
    }
    return launchOptions;
  });

  on("file:preprocessor", cucumber());
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
};
