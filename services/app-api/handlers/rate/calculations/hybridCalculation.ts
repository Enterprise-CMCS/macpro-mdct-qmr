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
    return (numerator: number, denominator: number, weight: number) =>
      fixRounding(weight, 5) * ((numerator / denominator) * 100);
  }

  public setFormulaRates(
    values: {
      measurePopulation: FormattedMeasureData["measurePopulation"];
      rates: FormattedMeasureData["rates"];
    }[],
    calcFormula: Function
  ) {
    let totalMeasurePopulation = values
      .filter((value) => value.measurePopulation)
      ?.reduce((acc, item) => {
        return (acc += item.measurePopulation!);
      }, 0);

    const weightedRates = values.map((value) => {
      const weight = value.measurePopulation! / totalMeasurePopulation;

      return Object.values(value.rates)
        .flat()
        .map((rate) => {
          const weightedRates = calcFormula(
            rate.numerator,
            rate.denominator,
            isNaN(weight) ? 1 : weight
          );
          return { ...rate, rate: weightedRates };
        });
    });
    return weightedRates.flat();
  }

  calculate(
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
