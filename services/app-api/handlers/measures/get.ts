import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { measureErrorHandler } from "../authUtils/checkAuth";

export const listMeasures = handler(async (event, context) => {
  const stage = process!.env!.stage!
  const errorCode = measureErrorHandler(event, 'LIST', stage)
   if(errorCode !== 200){
    return {
      statusCode: errorCode,
      body: JSON.stringify({
        error: "Failure: HTTP Status Code ", errorCode,
      }),
    };
  }

  const state = event!.pathParameters!.state!;
  const year = event!.pathParameters!.year!;
  const coreSet = event!.pathParameters!.coreSet!;

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
  const stage = process!.env!.stage!
  const errorCode = measureErrorHandler(event, 'GET', stage)
   if(errorCode !== 200){
    return {
      statusCode: errorCode,
      body: JSON.stringify({
        error: "Failure: HTTP Status Code ", errorCode,
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
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});
