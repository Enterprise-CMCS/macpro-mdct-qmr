import { Program, StandardRateShape } from "../../../types";
import { fixRounding } from "../../../utils/constants/math";
import { DataSource, FormattedMeasureData } from "./types";

export abstract class RateCalculation {
  abstract dataSrcMap: { [key in Program]: DataSource[] }[];

  constructor() {}
  abstract getFormula(measure: string): Function;

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

  public calculate(
    measure: string,
    values: {
      measurePopulation: FormattedMeasureData["measurePopulation"];
      rates: FormattedMeasureData["rates"];
    }[]
  ) {
    const formula: Function = this.getFormula(measure);
    const flattenRates = values
      .map((value) => Object.values(value.rates))
      .flat(2);
    const uid = flattenRates
      .filter(
        (value, index, array) =>
          array.findIndex((item) => item.uid === value.uid) === index
      )
      .map((item) => item.uid);
    const sumRates = uid.map((id) =>
      flattenRates.filter((rate) => rate.uid === id)
    );
    const total = this.sum(sumRates, formula);
    return { column: "Combined Rate", rates: total };
  }
}
