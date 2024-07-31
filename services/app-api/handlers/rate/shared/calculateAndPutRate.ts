import * as Types from "../../../types";
import { putToTable, getMeasureByCoreSet } from "../../../storage/table";
import { RateCalculation } from "../calculations/rateCalculation";
import {
  AdminstrativeCalculation,
  HybridCalculation,
  HybridOtherCalculation,
} from "../calculations";
import { MeasureParameters } from "../../../types";
import { FormattedMeasureData } from "../calculations/types";

export const formatMeasureData = (data: (Types.Measure | undefined)[]) => {
  return data.map((item) => {
    const column = Types.Program[item?.coreSet.at(-1) as "M" | "C"];
    const dataSource = item?.data?.DataSource ?? [];
    const dataSourceSelections = item?.data?.DataSourceSelections ?? [];
    const rates = item?.data?.PerformanceMeasure?.rates ?? {};
    const measurePopulation = item?.data?.HybridMeasurePopulationIncluded;

    return {
      column,
      dataSource,
      dataSourceSelections,
      rates,
      ...(measurePopulation && {
        "measure-eligible population": measurePopulation,
      }),
    };
  });
};

//checks to see which set of data is valid, and only return those for calculation
export const removeInvalidRates = (data: FormattedMeasureData[]) => {
  //remove programs with empty rates or unfilled data source
  return data.filter(
    (program) =>
      program.dataSource.length > 0 && Object.values(program.rates).length > 0
  );
};

export const calculateAndPutRate = async (
  pathParameters: MeasureParameters
) => {
  const { coreSet, measure, state, year } = pathParameters;
  const combinedTypes = [Types.CoreSetAbbr.ACS, Types.CoreSetAbbr.CCS];
  const combinedCoreSet: Types.CoreSetAbbr = combinedTypes.find((type) =>
    coreSet!.includes(type)
  )!;

  //add new calculations to this array
  const dataSrcCalculations: RateCalculation[] = [
    new AdminstrativeCalculation(measure),
    new HybridCalculation(measure),
    new HybridOtherCalculation(measure),
  ];

  //only do the rate calculation if the measure is adult or child and is a split
  if (
    coreSet.length === 4 &&
    (combinedCoreSet === Types.CoreSetAbbr.ACS ||
      combinedCoreSet === Types.CoreSetAbbr.CCS)
  ) {
    const data = await getMeasureByCoreSet(combinedCoreSet!, pathParameters);
    const formattedData = formatMeasureData(data);

    //check which data is valid for summation
    const validatedData = removeInvalidRates(formattedData);

    //based on the measure data, it will check against the calculations that exist and see which one is a match
    const rateCalc: RateCalculation | undefined = dataSrcCalculations.find(
      (cal) => cal.check(validatedData)
    );

    const combinedRates = [
      ...(rateCalc?.expandRates(formattedData) ?? formattedData),
      rateCalc ? rateCalc.calculate(validatedData) : {},
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
