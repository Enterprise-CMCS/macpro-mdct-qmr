import { RateNDRShape } from "../../../types";
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

  protected totalMeasureEligiblePopulation: number = 0;

  sum(arr: RateNDRShape[][]) {
    return arr?.map((rates) => {
      return rates?.reduce((prev, curr) => {
        const calculable = !(!prev["weighted rate"] || !curr["weighted rate"]);
        const weightedRate = calculable
          ? fixRounding(
              Number(prev["weighted rate"]) + Number(curr["weighted rate"]),
              1
            ).toFixed(1)
          : "";

        return {
          category: curr.category ?? "",
          label: curr.label ?? "",
          "weighted rate": weightedRate,
          uid: curr?.uid,
        };
      });
    });
  }

  getFormula(measure: string): Function {
    return (numerator: number, denominator: number, weight: number) =>
      fixRounding(weight, 5) * fixRounding((numerator / denominator) * 100, 1);
  }

  expandRates(arr: FormattedMeasureData[]) {
    const formula: Function = this.getFormula(this.measure);

    return arr.map((data) => {
      if (data.dataSource.length <= 0) return data;

      const weight =
        Number(data["measure-eligible population"]) /
        this.totalMeasureEligiblePopulation;

      for (const [key, value] of Object.entries(data.rates)) {
        data.rates[key] = (value as RateNDRShape[]).map((rate) => {
          rate["weighted rate"] =
            isNaN(weight) || !rate.rate
              ? ""
              : fixRounding(
                  formula(rate.numerator, rate.denominator, weight),
                  1
                ).toFixed(1);
          return rate;
        });
      }
      return data;
    });
  }

  calculate(data: FormattedMeasureData[]) {
    this.totalMeasureEligiblePopulation = data
      .filter((item) => item["measure-eligible population"])
      .reduce((acc, item) => {
        return (acc += Number(item["measure-eligible population"]));
      }, 0);

    const rates = this.expandRates(data)?.map((item) => item.rates);
    const flattenRates = rates.map((rate) => Object.values(rate)).flat(2);
    const total = this.sum(this.groupRates(flattenRates));
    return { column: "Combined Rate", rates: total };
  }
}
