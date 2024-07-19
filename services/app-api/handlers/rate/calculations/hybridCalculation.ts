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

  sum(arr: StandardRateShape[][], rateFormula: Function) {
    const measurePopulationTotal = arr.map((rates) => rates);

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
}
