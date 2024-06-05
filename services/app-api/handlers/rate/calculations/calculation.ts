import { APIGatewayProxyEvent } from "../../../types";
import * as Types from "../../../types";
import { adminstrativeCalculation } from "./adminstrativeCalculation";
import { putToTable, getMeasureByCoreSet } from "../../../storage/table";

const formatMeasureData = (data: any) => {
  return data.map((item: any) => {
    const column: string =
      Types.Program[(item?.coreSet)[item?.coreSet.length - 1] as "M" | "C"];
    const dataSource = item?.data?.DataSource ?? [];
    const rates = item?.data?.PerformanceMeasure?.rates ?? {};

    return { column, dataSource, rates };
  });
};

export const calculateAndPutRate = async (
  event: APIGatewayProxyEvent,
  context: any
) => {
  const { coreSet, measure, state, year } = event!.pathParameters!;
  const combinedTypes = [Types.CoreSetAbbr.ACS, Types.CoreSetAbbr.CCS];
  const combinedCoreSet: Types.CoreSetAbbr = combinedTypes.find((type) =>
    coreSet!.includes(type)
  )!;

  //only do the rate calculation if the measure is adult or child and is a split
  if (
    (coreSet!.length === 4 && combinedCoreSet === "ACS") ||
    combinedCoreSet === "CCS"
  ) {
    const data = await getMeasureByCoreSet(event, combinedCoreSet!);
    const formattedData: [] = formatMeasureData(data);

    const combinedRates = [
      ...formattedData,
      adminstrativeCalculation(
        measure!,
        formattedData?.map((data: any) => data.rates)
      ),
    ];

    //write to the data to the rates table
    await putToTable(
      event,
      process.env.rateTableName!,
      combinedRates,
      {
        compoundKey: `${state}${year}${coreSet}${measure}`,
        measure: measure!,
      },
      { state: state!, year: year! }
    );
  }
};
