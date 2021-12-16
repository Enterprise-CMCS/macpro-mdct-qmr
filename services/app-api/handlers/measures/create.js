import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";

export const createMeasure = handler(async (event, context) => {
  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName,
    Item: {
      compoundKey: dynamoKey,
      state: event.pathParameters.state,
      year: event.pathParameters.year,
      coreSet: event.pathParameters.coreSet,
      measure: event.pathParameters.measure,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: "incomplete",
      description: event.body.description,
      data: event.body.data,
    },
  };

  await dynamoDb.put(params);

  return params;
});
