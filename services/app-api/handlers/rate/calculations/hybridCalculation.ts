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

  sum(arr: StandardRateShape[][], rateFormula: Function) {
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

  adjustForDisplay(arr: FormattedMeasureData[]) {
    return arr.map((data) => {
      const weight =
        Number(data["measure-eligible population"]) /
        this.totalMeasureEligiablePopulation;

      for (const [key, value] of Object.entries(data.rates)) {
        data.rates[key] = value.map((rate) => {
          rate["weighted rate"] =
            isNaN(weight) || !rate.rate
              ? ""
              : (Number(rate.rate) * fixRounding(weight, 5)).toFixed(1);
          return rate;
        });
      }
      return data;
    });
  }

  calculate(measure: string, data: FormattedMeasureData[]) {
    const formula: Function = this.getFormula(measure);

    this.totalMeasureEligiablePopulation = data
      .filter((item) => item["measure-eligible population"])
      .reduce((acc, item) => {
        return (acc += Number(item["measure-eligible population"]));
      }, 0);

    const rates = this.adjustForDisplay(data)?.map((item) => item.rates);
    const flattenRates = rates.map((rate) => Object.values(rate)).flat(2);
    const total = this.sum(this.groupRates(flattenRates), formula);
    return { column: "Combined Rate", rates: total };
  }
}
