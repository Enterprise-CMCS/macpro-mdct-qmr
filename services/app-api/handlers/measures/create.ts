import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { MeasureStatus } from "../../types";
import { measureEventValidator } from "../authUtils/checkAuth";

export const createMeasure = handler(async (event, context) => {
  const errorCode = measureEventValidator(event, "POST");
  if (errorCode !== 200) {
    return {
      statusCode: errorCode,
      body: JSON.stringify({
        error: "Failure: HTTP Status Code ",
        errorCode,
      }),
    };
  }

  const body = JSON.parse(event!.body!);
  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName,
    Item: {
      compoundKey: dynamoKey,
      state: event!.pathParameters!.state!,
      year: parseInt(event!.pathParameters!.year!),
      coreSet: event!.pathParameters!.coreSet!,
      measure: event!.pathParameters!.measure!,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: MeasureStatus.INCOMPLETE,
      description: body.description ?? "",
      data: body.data,
    },
  };

  await dynamoDb.put(params);

  return params;
});
