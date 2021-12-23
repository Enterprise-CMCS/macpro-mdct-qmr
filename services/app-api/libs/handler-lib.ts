import * as debug from "./debug-lib";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

type LambdaFunction = (
  event: APIGatewayProxyEvent,
  context: any
) => Promise<any>; //we should probably make this a type of Promise<APIGatewayProxyResult> eventually

export default function handler(lambda: LambdaFunction) {
  return async function (event: any, context: any) {
    let body, statusCode;

    // Start debugger
    debug.init(event, context);

    try {
      // Run the Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e: any) {
      // Print debug messages
      debug.flush(e);

      body = { error: e.message };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
