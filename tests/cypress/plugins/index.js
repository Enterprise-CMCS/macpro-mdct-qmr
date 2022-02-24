module.exports = (on, config) => {
  config.baseUrl = process.env.APPLICATION_ENDPOINT || "http://localhost:3000";

  return config;
};

const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on, config) => {
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

// module.exports = (on, config) => {

// };
