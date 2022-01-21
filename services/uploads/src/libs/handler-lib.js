import * as debug from "./debug-lib";
import { failure, success } from "./response-lib";

export default function handler(lambda) {
  return async function (event, context) {
    // Start debugger
    debug.init(event, context);

    try {
      // Run the Lambda
      const body = await lambda(event, context);
      return success(body);
    } catch (e) {
      // Print debug messages
      debug.flush(e);

      const body = { error: e.message };
      return failure(body);
    }
  };
}
