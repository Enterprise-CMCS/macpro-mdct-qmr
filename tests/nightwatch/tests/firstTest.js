module.exports = {
  "My first test case"(browser) {
    browser.url(`${process.env.APPLICATION_ENDPOINT}`);
  },
};
