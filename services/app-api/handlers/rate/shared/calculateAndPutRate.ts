import * as Types from "../../../types";
import { putToTable, getMeasureByCoreSet } from "../../../storage/table";
import { RateCalculation } from "../calculations/rateCalculation";
import { AdminstrativeCalculation } from "../calculations";

//add new calculations to this array
const dataSrcCalculations: RateCalculation[] = [new AdminstrativeCalculation()];

export const formatMeasureData = (data: any) => {
  return data.map((item: any) => {
    const column: string =
      Types.Program[(item?.coreSet)[item?.coreSet.length - 1] as "M" | "C"];
    const dataSource = item?.data?.DataSource ?? [];
    const dataSourceSelections = item?.data?.DataSourceSelections ?? [];
    const rates = item?.data?.PerformanceMeasure?.rates ?? {};

    return { column, dataSource, dataSourceSelections, rates };
  });
};

export const calculateAndPutRate = async (pathParameters: any) => {
  const { coreSet, measure, state, year } = pathParameters;
  const combinedTypes = [Types.CoreSetAbbr.ACS, Types.CoreSetAbbr.CCS];
  const combinedCoreSet: Types.CoreSetAbbr = combinedTypes.find((type) =>
    coreSet!.includes(type)
  )!;

  //only do the rate calculation if the measure is adult or child and is a split
  if (
    (coreSet!.length === 4 && combinedCoreSet === Types.CoreSetAbbr.ACS) ||
    combinedCoreSet === Types.CoreSetAbbr.CCS
  ) {
    const data = await getMeasureByCoreSet(combinedCoreSet!, pathParameters);
    const formattedData: [] = formatMeasureData(data);

    //based on the measure data, it will check against the calculations that exist and see which one is a match
    const calculation: RateCalculation | undefined = dataSrcCalculations.find(
      (cal) => cal.check(formattedData)
    );

    const combinedRates = [
      ...formattedData,
      calculation
        ? calculation.calculate(
            measure!,
            formattedData?.map((data: any) => data.rates)
          )
        : {},
    ];

    //write to the data to the rates table
    return await putToTable(
      process.env.rateTableName!,
      combinedRates,
      {
        compoundKey: `${state}${year}${combinedCoreSet}${measure}`,
        measure: measure!,
      },
      { state: state!, year: year! }
    );
  }
};
