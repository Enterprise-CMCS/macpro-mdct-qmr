import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { createCoreSet } from "./create";
import * as Types from "../../types";
import { listMeasures } from "../measures/get";

export const coreSetList = handler(async (event, context) => {
  const params = {
    TableName: process.env.coreSetTableName,
    ...convertToDynamoExpression(
      {
        state: event!.pathParameters!.state!,
        year: parseInt(event!.pathParameters!.year!),
        coreSet: Types.CoreSetAbbr.ACS,
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
    const updatedProgressResults = await updateCoreSetProgress(
      results,
      event,
      context
    );

    return updatedProgressResults;
  }
});

const updateCoreSetProgress = async (
  coreSet: any,
  event: any,
  context: any
) => {
  const waitingCoreset = await coreSet;
  if (waitingCoreset.Items?.length) {
    await waitingCoreset.Items.forEach(async (coreSet: any) => {
      event.pathParameters!.coreSet = coreSet.coreSet;
      const measuresResposne = await listMeasures(event, context);
      const measuresList = JSON.parse(measuresResposne.body);

      const measures = measuresList.Items;
      const completedAmount = measures.filter(
        (measure: any) => measure.status === Types.MeasureStatus.COMPLETE
      )?.length;
      coreSet.progress.numComplete = completedAmount;
    });
  }
};

export const getCoreSet = handler(async (event, context) => {
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
