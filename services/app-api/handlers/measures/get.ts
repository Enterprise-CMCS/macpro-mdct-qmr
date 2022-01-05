import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";

export const listMeasures = handler(async (event, context) => {
  if (!event.pathParameters) return; // throw error message
  if (
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet
  )
    return; // throw error message

  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;

  console.log(state, year, coreSet);
  const params = {
    TableName: process.env.measureTableName,
    ...convertToDynamoExpression(
      { state: state, year: parseInt(year), coreSet: coreSet },
      "list"
    ),
  };
  const queryValue = await dynamoDb.scan(params);
  return queryValue;
});

export const getMeasure = handler(async (event, context) => {
  if (!event.pathParameters) return; // throw error message
  if (
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet
  )
    return; // throw error message

  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event.pathParameters.coreSet,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});
