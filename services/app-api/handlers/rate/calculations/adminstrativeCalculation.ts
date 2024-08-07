import { RateCalculation } from "./rateCalculation";
import { DataSource, FormattedMeasureData, UniqMeasureAbbr } from "./types";

export class AdminstrativeCalculation extends RateCalculation {
  dataSrcMap = [
    {
      Medicaid: [DataSource.Administrative],
      CHIP: [DataSource.Administrative],
    },
    {
      Medicaid: [DataSource.Administrative],
      CHIP: [DataSource.EHR],
    },
    {
      Medicaid: [DataSource.EHR],
      CHIP: [DataSource.EHR],
    },
    {
      Medicaid: [DataSource.EHR],
      CHIP: [DataSource.Administrative],
    },
    {
      Medicaid: [DataSource.Administrative, DataSource.EHR],
      CHIP: [DataSource.Administrative],
    },
  ];
  check(arr: FormattedMeasureData[]): boolean {
    const chipSources =
      arr.find((data) => data.column === "CHIP")?.dataSource ?? [];
    const medicaidSources =
      arr.find((data) => data.column === "Medicaid")?.dataSource ?? [];

    // If the user had selected hybrid as a data source, we will not use this calculation
    const isHybrid = [chipSources, medicaidSources].some((srcs) => {
      return (srcs as string[])?.includes(DataSource.Hybrid);
    });

    if (isHybrid) {
      return false;
    }

    return super.check(arr);
  }

  getFormula(measure: string): Function {
    const abbr = measure.slice(0, 3);
    switch (abbr) {
      case UniqMeasureAbbr.AMB:
        return (numerator: number, denominator: number) =>
          (numerator / denominator) * 1000;
      case UniqMeasureAbbr.PQI:
        return (numerator: number, denominator: number) =>
          (numerator / denominator) * 100000;
      case UniqMeasureAbbr.AAB:
        return (numerator: number, denominator: number) =>
          (1 - numerator / denominator) * 100;
      default:
        return (numerator: number, denominator: number) =>
          (numerator / denominator) * 100;
    }
  }
}
