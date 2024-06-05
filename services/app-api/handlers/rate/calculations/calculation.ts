import { APIGatewayProxyEvent } from "../../../types";
import * as Types from "../../../types";
import { adminstrativeCalculation } from "./adminstrativeCalculation";
import { putToTable, getMeasureByCoreSet } from "../../../storage/table";

export const createCombinedCompoundKey = (
  event: APIGatewayProxyEvent,
  coreSet: string
) => {
  if (!event.pathParameters) throw new Error("No Path Parameters Object");

  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const measure = event.pathParameters.measure ?? "";

  return `${state}${year}${coreSet}${measure}`;
};

const formatData = (data: any) => {
  return data.map((item: any) => {
    const coreSet = item?.coreSet;
    const dataSource = item?.data?.DataSource ?? [];
    const rates = item?.data?.PerformanceMeasure?.rates ?? {};

    return { coreSet, dataSource, rates };
  });
};

export const calculateRate = async (
  event: APIGatewayProxyEvent,
  context: any
) => {
  const { coreSet, measure, state, year } = event!.pathParameters!;
  const combinedTypes = [Types.CoreSetAbbr.ACS, Types.CoreSetAbbr.CCS];
  const combinedCoreSet = combinedTypes.find((type) => coreSet!.includes(type));

  //only do the rate calculation if the measure is adult or child and is a split
  if (
    (coreSet!.length === 4 && combinedCoreSet === "ACS") ||
    combinedCoreSet === "CCS"
  ) {
    const data = await getMeasureByCoreSet(event, combinedCoreSet);
    const formattedData = formatData(data);

    const combinedRates = {
      ...formattedData,
      ...adminstrativeCalculation(
        measure!,
        formattedData?.map((data: any) => data.rates)
      ),
    };

    //write to the data to the rates table
    await putToTable(
      event,
      process.env.rateTableName!,
      combinedRates,
      {
        compoundKey: createCombinedCompoundKey(event, coreSet!),
        measure: measure!,
      },
      { state: state!, year: year! }
    );
  }
};
