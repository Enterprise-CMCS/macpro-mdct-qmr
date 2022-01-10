import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { measureErrorHandler } from "../authUtils/checkAuth";

export const deleteMeasure = handler(async (event, context) => {
  const errorCode = measureErrorHandler(event, "DELETE");
  if (errorCode !== 200) {
    return {
      statusCode: errorCode,
      body: JSON.stringify({
        error: "Failure: HTTP Status Code ",
        errorCode,
      }),
    };
  }

  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event!.pathParameters!.coreSet!,
    },
  };

  await dynamoDb.delete(params);

  return params;
});
