import { APIGatewayProxyEvent } from "../types";
import { listMeasures } from "../handlers/measures/get";
import { CoreSet, Measure, MeasureStatus } from "../types";

export const updateCoreSetProgress = async (
  coreSets: CoreSet[],
  event: APIGatewayProxyEvent,
  context: any
) => {
  for (const coreSet of coreSets) {
    event.pathParameters!.coreSet = coreSet.coreSet;
    const measuresResponse = await listMeasures(event, context);
    const measuresList: Measure[] = JSON.parse(measuresResponse.body).Items;

    const completedAmount = measuresList?.filter(
      (measure) =>
        measure.status === MeasureStatus.COMPLETE &&
        measure.measure !== "CSQ" &&
        !measure.placeholder
    ).length;

    const availableAmount = measuresList?.filter(
      (measure) => !measure.placeholder && measure.measure !== "CSQ"
    ).length;

    coreSet.progress!.numComplete =
      completedAmount ?? coreSet.progress!.numComplete;

    coreSet.progress!.numAvailable =
      availableAmount ?? coreSet.progress!.numAvailable;
  }
};
