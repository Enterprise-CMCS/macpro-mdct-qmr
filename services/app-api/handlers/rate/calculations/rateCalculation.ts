import { Program, StandardRateShape, StandardValueShape } from "../../../types";
import { fixRounding } from "../../../utils/constants/math";
import { DataSource, FormattedMeasureData } from "./types";

export abstract class RateCalculation {
  abstract dataSrcMap: { [key in Program]: DataSource[] }[];
  public measure: string;

  constructor(measure: string) {
    this.measure = measure;
  }
  abstract getFormula(measure: string): Function;

  public expandRates(arr: FormattedMeasureData[]) {
    return arr;
  }

  public check(arr: FormattedMeasureData[]): boolean {
    const chipSources =
      arr.find((data) => data.column === "CHIP")?.dataSource ?? [];
    const medicaidSources =
      arr.find((data) => data.column === "Medicaid")?.dataSource ?? [];

    // If neither measure has any data source, we will not use this calculation
    if (chipSources.length === 0 && medicaidSources.length === 0) {
      return false;
    }

    return this.dataSrcMap.some((dataSrc) => {
      // If a measure has no data sources, .every() returns true
      // This is good because we still want to calculate even if only one measure is complete.
      const chipSourcesMatch = chipSources.every((chipSrc) =>
        dataSrc.CHIP.includes(chipSrc)
      );
      const medicaidSourcesMatch = medicaidSources.every((medSrc) =>
        dataSrc.Medicaid.includes(medSrc)
      );
      return chipSourcesMatch && medicaidSourcesMatch;
    });
  }

  public sum(arr: StandardRateShape[][], rateFormula: Function) {
    return arr?.map((rates) =>
      rates?.reduce((prev, curr) => {
        const numerator =
          Number(prev.numerator ?? 0) + Number(curr.numerator ?? 0);
        const denominator =
          Number(prev.denominator ?? 0) + Number(curr.denominator ?? 0);
        const rate =
          denominator > 0
            ? fixRounding(rateFormula(numerator, denominator), 1).toFixed(1) //added for generating trailing zeros
            : "";

        return {
          category: prev.category ?? "",
          label: prev.label ?? "",
          numerator: numerator.toString(),
          denominator: denominator.toString(),
          rate: rate,
          uid: prev?.uid,
        };
      })
    );
  }

  //creates an array where the rates have been grouped by uid, makes it easier for summation
  public groupRates(rates: StandardRateShape[] | StandardValueShape[]) {
    //create an array with all the uids
    const uid = rates
      .filter(
        (value, index, array) =>
          array.findIndex((item) => item.uid === value.uid) === index
      )
      .map((item) => item.uid);

    //group the rate by those with the same uid
    return uid.map((id) => rates.filter((rate) => rate.uid === id));
  }

  public calculate(data: FormattedMeasureData[]) {
    const formula: Function = this.getFormula(this.measure);
    const rates = data?.map((item) => item.rates);
    const flattenRates = rates.map((rate) => Object.values(rate)).flat(2);

    const total = this.sum(this.groupRates(flattenRates), formula);
    return { column: "Combined Rate", rates: total };
  }
}
