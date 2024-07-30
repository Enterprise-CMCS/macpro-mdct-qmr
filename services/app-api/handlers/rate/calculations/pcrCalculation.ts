import { StandardValueShape } from "../../../types";
import { fixRounding } from "../../../utils/constants/math";
import { RateCalculation } from "./rateCalculation";
import { DataSource, FormattedMeasureData } from "./types";

export class PCRCalculation extends RateCalculation {
  dataSrcMap = [
    {
      Medicaid: [DataSource.Administrative],
      CHIP: [DataSource.Administrative],
    },
  ];
  check(arr: FormattedMeasureData[]): boolean {
    if (this.measure != "PCR-AD") return false;
    return super.check(arr);
  }

  sum(arr: StandardValueShape[][]) {
    return arr?.map((rates) => {
      return rates?.reduce((prev, curr) => {
        const value = Number(prev.value) + Number(curr.value);

        return {
          label: curr.label ?? "",
          value: value.toString(),
          uid: curr?.uid,
        };
      });
    });
  }

  getFormula(type: string): Function {
    switch (type.split("(")[0].trim()) {
      case "Observed Readmission Rate":
        return () => {
          const countOfObserved30Readmissions = 0;
          const countOfIHS = 0;
          return fixRounding(
            (countOfObserved30Readmissions / countOfIHS) * 100,
            4
          );
        };
      case "Expected Readmission Rate":
        return () => {};
      case "O/E Ratio":
        return () => {};
      case "Outlier Rate":
        return () => {};
    }
    return () => {};
  }

  public calculate(data: FormattedMeasureData[]) {
    const formula: Function = this.getFormula(this.measure);
    const rates = data?.map((item) => item.rates);
    const flattenRates = rates.map((rate) => Object.values(rate)).flat(2);

    const total = this.sum(this.groupRates(flattenRates));

    console.log("total test", JSON.stringify(total));
    return { column: "Combined Rate", rates: total };
  }
}
