import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";

// import dynamoDb from "./../libs/dynamodb-lib";

export const coreSetList = handler(async (event, context) => {
  if (!event.pathParameters) return; // throw error message
  if (!event.pathParameters.state || !event.pathParameters.year) return; // throw error message

  const params = {
    TableName: process.env.coreSetTableName,
    ...convertToDynamoExpression(
      {
        state: event.pathParameters.state,
        year: parseInt(event.pathParameters.year),
      },
      "list"
    ),
  };
  console.log(params);
  const queryValue = await dynamoDb.scan(params);
  return queryValue;
});

export const getCoreSet = handler(async (event, context) => {
  if (!event.pathParameters) return; // throw error message
  if (
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet
  )
    return; // throw error message

  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.coreSetTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event.pathParameters.coreSet,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});
