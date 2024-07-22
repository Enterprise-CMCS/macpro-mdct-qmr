import { StandardRateShape } from "../../../types";
import { fixRounding } from "../../../utils/constants/math";
import { RateCalculation } from "./rateCalculation";
import { DataSource, FormattedMeasureData } from "./types";

export class HybridCalculation extends RateCalculation {
  dataSrcMap = [
    {
      Medicaid: [DataSource.Hybrid],
      CHIP: [DataSource.Hybrid],
    },
    {
      Medicaid: [DataSource.CaseMagementRecordReview],
      CHIP: [DataSource.CaseMagementRecordReview],
    },
  ];

  sum(arr: StandardRateShape[][]) {
    return arr?.map((rates) =>
      rates?.reduce((prev, curr) => {
        const numerator =
          Number(prev.numerator ?? 0) + Number(curr.numerator ?? 0);
        const denominator =
          Number(prev.denominator ?? 0) + Number(curr.denominator ?? 0);
        const rate = fixRounding(
          Number(prev.rate) + Number(curr.rate),
          1
        ).toFixed(1);

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

  getFormula(measure: string): Function {
    return (
      numerator: number,
      denominator: number,
      measurePopulation: number,
      totalMeasurePopulation: number
    ) =>
      fixRounding(measurePopulation / totalMeasurePopulation, 5) *
      ((numerator / denominator) * 100);
  }

  public setFormulaRates(
    values: {
      measurePopulation: FormattedMeasureData["measurePopulation"];
      rates: FormattedMeasureData["rates"];
    }[],
    calcFormula: Function
  ) {
    const totalMeasurePopulation = values
      .map((value) => value.measurePopulation)
      .reduce((prev, curr) => prev + curr!);

    const weightedRates = values
      .map((value) => {
        const flattenRates = Object.values(value.rates).flat(2);
        return flattenRates.map((rate) => {
          const weightedRates = calcFormula(
            rate.numerator,
            rate.denominator,
            value.measurePopulation,
            totalMeasurePopulation
          );
          return { ...rate, rate: weightedRates };
        });
      })
      .flat(2);
    return weightedRates;
  }

  public calculate(
    measure: string,
    values: {
      measurePopulation: FormattedMeasureData["measurePopulation"];
      rates: FormattedMeasureData["rates"];
    }[]
  ) {
    const formula: Function = this.getFormula(measure);
    const formulaRates = this.setFormulaRates(values, formula);
    const uid = formulaRates
      .filter(
        (value, index, array) =>
          array.findIndex((item) => item.uid === value.uid) === index
      )
      .map((item) => item.uid);
    const sumRates = uid.map((id) =>
      formulaRates.filter((rate) => rate.uid === id)
    );
    const total = this.sum(sumRates);
    return { column: "Combined Rate", rates: total };
  }
}
