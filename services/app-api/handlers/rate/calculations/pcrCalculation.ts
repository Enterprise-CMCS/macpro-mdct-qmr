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
        const value = (
          Number(prev.value ?? 0) + Number(curr.value ?? 0)
        ).toString();
        return {
          label: curr.label ?? "",
          value: value ?? "",
          uid: curr?.uid,
        };
      });
    });
  }
  expandRates(arr: FormattedMeasureData[]) {
    arr.map((data) => {
      for (const [key, value] of Object.entries(data.rates)) {
        data.rates[key] = value.map((item) => {
          return { ...item, value: "" };
        });
      }
      return data;
    });
    return arr;
  }

  getFormula(type: string): Function {
    switch (type.split("(")[0].trim()) {
      case "Observed Readmission Rate":
        return (values: any) => {
          const countOfObserved30DayReadmissions =
            values["Count of Observed 30-Day Readmissions"];
          const countOfIHS = values["Count of Index Hospital Stays"];
          return fixRounding(
            (countOfObserved30DayReadmissions / countOfIHS) * 100,
            4
          ).toFixed(4);
        };
      case "Expected Readmission Rate":
        return (values: any) => {
          const countOfExpected30DayReadmissions =
            values["Count of Expected 30-Day Readmissions"];
          const countOfIHS = values["Count of Index Hospital Stays"];
          return fixRounding(
            (countOfExpected30DayReadmissions / countOfIHS) * 100,
            4
          ).toFixed(4);
        };
      case "O/E Ratio":
        return (values: any) => {
          const ORR = values["Observed Readmission Rate"];
          const ERR = values["Expected Readmission Rate"];
          return fixRounding(ORR / ERR, 4).toFixed(4);
        };
      case "Outlier Rate":
        return (values: any) => {
          const numberOfOutliers = values["Number of Outliers"];
          const countOfBeneficiariesInMedicaidPopulation =
            values["Count of Beneficiaries in Medicaid Population"];
          return fixRounding(
            (numberOfOutliers / countOfBeneficiariesInMedicaidPopulation) *
              1000,
            1
          ).toFixed(1);
        };
    }
    return () => {};
  }
  private rateByFormula = (rates: StandardValueShape[]) => {
    //build the value look up by name
    const valueLookup = Object.fromEntries(
      rates.map((rate) => [rate.label.split("(")[0].trim(), rate.value])
    );

    //these are run in order as some values are used later values cals
    for (const key of [
      "Observed Readmission Rate",
      "Expected Readmission Rate",
      "O/E Ratio",
      "Outlier Rate",
    ]) {
      valueLookup[key] = this.getFormula(key)(valueLookup) ?? "";
    }

    return rates.map((rate) => {
      const value = valueLookup[rate.label.split("(")[0].trim()] ?? "";
      return { ...rate, value: value };
    });
  };

  public calculate(data: FormattedMeasureData[]) {
    const rates = data?.map((item) => item.rates);
    const flattenRates = rates.map((rate) => Object.values(rate)).flat(2);
    const sum = this.sum(this.groupRates(flattenRates));
    const total = this.rateByFormula(sum);
    return { column: "Combined Rate", rates: total };
  }
}
