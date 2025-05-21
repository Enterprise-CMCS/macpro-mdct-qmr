import * as logger from "./debug-lib";
import { APIGatewayProxyEvent } from "../types";
import { failure, buildResponse } from "./response-lib";

type LambdaFunction = (
  event: APIGatewayProxyEvent,
  context: any
) => Promise<any>;

export default function handler(lambda: LambdaFunction) {
  return async function (event: APIGatewayProxyEvent, context: any) {
    logger.init();
    logger.debug("API event: %O", {
      body: event.body,
      pathParameters: event.pathParameters,
      queryStringParameters: event.queryStringParameters,
    });

    try {
      // Run the Lambda
      const { status, body } = await lambda(event, context);
      return buildResponse(status, body);
    } catch (e: any) {
      // Print debug messages
      logger.error("Error: %O", e);

      const body = { error: e.message };
      return failure(body);
    } finally {
      logger.flush();
    }
  };
}
