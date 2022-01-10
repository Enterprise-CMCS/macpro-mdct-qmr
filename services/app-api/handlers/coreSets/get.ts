import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { errorHandler } from "../authUtils/checkAuth";

// import dynamoDb from "./../libs/dynamodb-lib";

export const coreSetList = handler(async (event, context) => {
  const stage = process!.env!.stage!
  const errorCode = errorHandler(event, 'LIST', stage)
   if(errorCode !== 200){
    return {
      statusCode: errorCode,
      body: JSON.stringify({
        error: "Failure: HTTP Status Code ", errorCode,
      }),
    };
  }

  const params = {
    TableName: process.env.coreSetTableName,
    ...convertToDynamoExpression(
      {
        state: event!.pathParameters!.state!,
        year: parseInt(event!.pathParameters!.year!),
      },
      "list"
    ),
  };
  console.log(params);
  const queryValue = await dynamoDb.scan(params);
  return queryValue;
});

export const getCoreSet = handler(async (event, context) => {
  const stage = process!.env!.stage!
  const errorCode = errorHandler(event, 'GET', stage)
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
    TableName: process.env.coreSetTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event!.pathParameters!.coreSet!,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});
