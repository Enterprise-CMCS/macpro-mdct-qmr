import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { createCoreSet } from "./create";
import * as Types from "../../types";

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

  const results = await dynamoDb.scan(params);

  // if the query value contains no results
  if (results.Count === 0) {
    // add an adult coreset and requery the db
    const createCoreSetEvent = {
      ...event,
      pathParameters: {
        ...event.pathParameters,
        coreSet: Types.CoreSetAbbr.ACS,
      },
    };
    try {
      const createCoreSetResult = await createCoreSet(
        createCoreSetEvent,
        context
      );
      if (createCoreSetResult.statusCode === 200) {
        return await dynamoDb.scan(params);
      }
    } catch (e) {
      console.log(e);
      throw new Error("Failed to create new coreset");
    }
  } else {
    return results;
  }
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
