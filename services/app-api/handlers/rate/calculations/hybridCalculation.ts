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

  private totalMeasureEligiablePopulation: number = 0;

  sum(arr: StandardRateShape[][]) {
    return arr?.map((rates) => {
      return rates?.reduce((prev, curr) => {
        const calculable = !(!prev["weighted rate"] || !curr["weighted rate"]);
        const weightedRate = calculable
          ? (
              Number(prev["weighted rate"]) + Number(curr["weighted rate"])
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
      fixRounding(weight, 5) * ((numerator / denominator) * 100);
  }

  expandRates(arr: FormattedMeasureData[]) {
    const formula: Function = this.getFormula(this.measure);

    return arr.map((data) => {
      if (data.dataSource.length <= 0) return data;

      const weight =
        Number(data["measure-eligible population"]) /
        this.totalMeasureEligiablePopulation;

      for (const [key, value] of Object.entries(data.rates)) {
        data.rates[key] = value.map((rate) => {
          rate["weighted rate"] =
            isNaN(weight) || !rate.rate
              ? ""
              : formula(rate.numerator, rate.denominator, weight).toFixed(1);
          return rate;
        });
      }
      return data;
    });
  }

  calculate(data: FormattedMeasureData[]) {
    this.totalMeasureEligiablePopulation = data
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
