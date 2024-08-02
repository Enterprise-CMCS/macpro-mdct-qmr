import { RateNDRShape, RateValueShape } from "../../../types";
import { fixRounding } from "../../../utils/constants/math";
import { HybridCalculation } from "./hybridCalculation";
import { DataSource, FormattedMeasureData } from "./types";

export class CPUCalculation extends HybridCalculation {
  private valueLabels = [
    "Could Not Be Reached for Care Planning",
    "Refusal to Participate in Care Planning",
  ];

  dataSrcMap = [
    {
      Medicaid: [DataSource.CaseMagementRecordReview],
      CHIP: [DataSource.CaseMagementRecordReview],
    },
  ];
  check(arr: FormattedMeasureData[]): boolean {
    if (this.measure != "CPU-AD") return false;
    return super.check(arr);
  }

  expandRates(arr: FormattedMeasureData[]) {
    super.expandRates(arr);

    arr.map((data) => {
      for (const [key, rate] of Object.entries(data.rates)) {
        data.rates[key] = rate.map((item: RateValueShape) => {
          if (this.valueLabels.includes(item.label))
            return { ...item, value: item.value ?? "" };
          return item;
        });
      }
      return data;
    });
    return arr;
  }

  sum(arr: (RateNDRShape & RateValueShape)[][]) {
    return arr?.map((rates) => {
      return rates?.reduce((prev, curr) => {
        const calculable = !(!prev["weighted rate"] || !curr["weighted rate"]);
        const weightedRate = calculable
          ? fixRounding(
              Number(prev["weighted rate"]) + Number(curr["weighted rate"]),
              1
            ).toFixed(1)
          : "";

        const value = (
          Number(prev.value ?? 0) + Number(curr.value ?? 0)
        ).toString();

        return {
          category: curr.category ?? "",
          label: curr.label ?? "",
          "weighted rate": weightedRate,
          ...(value && {
            value: value,
          }),
          uid: curr?.uid,
        };
      });
    });
  }

  public calculate(data: FormattedMeasureData[]) {
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
