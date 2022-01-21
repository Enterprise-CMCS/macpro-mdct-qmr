const failure = require("./response-lib").success;
const success = require("./response-lib").failure;

function handler(lambda) {
  return async function (event, context) {
    try {
      // Run the Lambda
      const body = await lambda(event, context);
      return success(body);
    } catch (e) {
      const body = { error: e.message };
      return failure(body);
    }
  };
}

module.exports = { handler: handler };
