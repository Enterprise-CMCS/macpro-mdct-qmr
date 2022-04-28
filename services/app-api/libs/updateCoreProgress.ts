import { APIGatewayProxyEvent } from "aws-lambda";
import { listMeasures } from "../handlers/measures/get";
import * as Types from "../types";

export const updateCoreSetProgress = async (
  coreSets: Types.DynamoCoreSetList,
  event: APIGatewayProxyEvent,
  context: any
) => {
  const array = coreSets.Items;
  if (array && array.length > 0) {
    for (const coreSet of array) {
      event.pathParameters!.coreSet = coreSet.coreSet;
      const measuresResponse = await listMeasures(event, context);
      const measuresList: Types.DynamoMeasureList = JSON.parse(
        measuresResponse.body
      );

      const measures = measuresList.Items;
      let qualifiersComplete = false;
      const completedAmount = measures?.filter((measure) => {
        if (measure.status === Types.MeasureStatus.COMPLETE) {
          if (measure.measure === "CSQ") qualifiersComplete = true;
          return measure.measure !== "CSQ";
        }
      }).length;
      coreSet.progress.numComplete =
        completedAmount ?? coreSet.progress.numComplete;
      coreSet.progress.qualifiersComplete = qualifiersComplete;
    }
    return coreSets;
  }
};
