import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";

// import dynamoDb from "./../libs/dynamodb-lib";

export const coreSetList = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const params = {
    TableName: process.env.coreSetTableName,
    ...convertToDynamoExpression({ state: state, year: year }, "list"),
  };
  const queryValue = await dynamoDb.scan(params);
  return queryValue;
});

export const getCoreSet = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${coreSet}`;
  const params = {
    TableName: process.env.coreSetTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});
