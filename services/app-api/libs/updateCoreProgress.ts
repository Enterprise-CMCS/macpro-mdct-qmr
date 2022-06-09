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

      const completedAmount = measures?.filter(
        (measure) =>
          measure.status === Types.MeasureStatus.COMPLETE &&
          measure.measure !== "CSQ"
      ).length;

      const availableAmount = measures?.filter(
        (measure) => measure.placeholder !== true && measure.measure !== "CSQ"
      ).length;

      coreSet.progress.numComplete =
        completedAmount ?? coreSet.progress.numComplete;

      coreSet.progress.numAvailable =
        availableAmount ?? coreSet.progress.numAvailable;
    }
    return coreSets;
  }
};
