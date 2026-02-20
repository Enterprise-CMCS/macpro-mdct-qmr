export default (defaultFn = async (on, _config) => {
  // e2e testing node events setup code
  // set default size for headless mode
  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.name === "chrome" && browser.isHeadless) {
      launchOptions.args.push("--window-size=1400,9000");
      launchOptions.args.push("--force-device-scale-factor=1");
      launchOptions.args.push("--headless=old");
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
});
