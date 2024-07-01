import { Program, StandardRateShape } from "../../../types";
import { DataSource, FormattedMeasureData } from "./types";

export abstract class RateCalculation {
  abstract dataSrcMap: { [key in Program]: DataSource[] }[];

  constructor() {}
  abstract check(arr: FormattedMeasureData[]): boolean;
  abstract getFormula(measure: string): Function;

  public sum(arr: StandardRateShape[][], rateFormula: Function) {
    return arr?.map((rates) =>
      rates?.reduce((prev, curr) => {
        const numerator =
          Number(prev.numerator ?? 0) + Number(curr.numerator ?? 0);
        const denominator =
          Number(prev.denominator ?? 0) + Number(curr.denominator ?? 0);
        const rate =
          denominator > 0
            ? (
                Math.round(rateFormula(numerator, denominator) * 100) / 100
              ).toString()
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
  public calculate(measure: string, rates: FormattedMeasureData["rates"][]) {
    const formula: Function = this.getFormula(measure);

    const flattenRates = rates.map((rate) => Object.values(rate)).flat(2);

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
