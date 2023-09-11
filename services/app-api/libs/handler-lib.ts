import * as debug from "./debug-lib";
import { APIGatewayProxyEvent } from "aws-lambda";
import { isAuthenticated } from "./authorization";
import { failure, buildResponse } from "./response-lib";
import { Errors, StatusCodes } from "../utils/constants/constants";

type LambdaFunction = (
  event: APIGatewayProxyEvent,
  context: any
) => Promise<any>;

export default function handler(lambda: LambdaFunction) {
  return async function (event: APIGatewayProxyEvent, context: any) {
    // Start debugger
    debug.init(event, context);

    if (isAuthenticated(event)) {
      try {
        // Run the Lambda
        const { status, body } = await lambda(event, context);
        return buildResponse(status, body);
      } catch (e: any) {
        // Print debug messages
        debug.flush(e);

        const body = { error: e.message };
        return failure(body);
      }
    } else {
      const body = { error: Errors.UNAUTHORIZED };
      return buildResponse(StatusCodes.UNAUTHORIZED, body);
    }
  };
}
