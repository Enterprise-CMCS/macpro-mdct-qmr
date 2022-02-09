import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { updateCoreSetProgress } from "../../libs/updateCoreProgress";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { createCoreSet } from "./create";
import * as Types from "../../types";

export const coreSetList = handler(async (event, context) => {
  const params = {
    TableName: process.env.coreSetTableName!,
    ...convertToDynamoExpression(
      {
        state: event!.pathParameters!.state!,
        year: parseInt(event!.pathParameters!.year!),
      },
      "list"
    ),
  };

  const results = await dynamoDb.scan<Types.CoreSet>(params);

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
    // Update the progress measure numComplete
    const updatedCoreSetProgressResults =
      (await updateCoreSetProgress(results, event, context)) || results;
    return updatedCoreSetProgressResults;
  }
});

export const getCoreSet = handler(async (event, context) => {
  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.coreSetTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event!.pathParameters!.coreSet!,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});
