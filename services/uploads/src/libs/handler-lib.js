const { success, failure } = require("./response-lib");

function handler(lambda) {
  return async function (event, context) {
    try {
      // Run the Lambda
      const body = await lambda(event, context);
      console.info("Handler executed successfully.");
      return success(body);
    } catch (error) {
      console.error(error);
      const body = { error: error.message };
      return failure(body);
    }
  };
}

module.exports = { handler: handler };
