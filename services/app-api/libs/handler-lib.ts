import * as logger from "./debug-lib";
import { APIGatewayProxyEvent } from "../types";
import { isAuthenticated } from "./authorization";
import { failure, buildResponse } from "./response-lib";
import { Errors, StatusCodes } from "../utils/constants/constants";

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

    if (isAuthenticated(event)) {
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
    } else {
      const body = { error: Errors.UNAUTHORIZED };
      return buildResponse(StatusCodes.UNAUTHORIZED, body);
    }
  };
}
