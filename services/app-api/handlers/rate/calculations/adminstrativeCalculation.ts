import { Measure, Program } from "../../../types";
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

    //if the user had selected hybrid as a data source, we will not use this calculation
    const isHybrid = [chipSources, medicaidSources].some((srcs) => {
      return (srcs as string[])?.includes(DataSource.Hybrid);
    });

    if (!isHybrid) {
      for (const dataSrc of this.dataSrcMap) {
        const chipSrcExist =
          chipSources.length > 0 &&
          chipSources.every((chipSrc) => dataSrc.CHIP.includes(chipSrc));
        const medicaidSrcExist =
          medicaidSources.length > 0 &&
          medicaidSources.every((medSrc) => dataSrc.Medicaid.includes(medSrc));

        //if both instance have data, then we want it to be a match for both
        if (chipSources.length > 0 && medicaidSources.length > 0) {
          if (chipSrcExist && medicaidSrcExist) return true;
        } else {
          //if only 1 set of data exist, as long as one of them is valid, we will return true
          if (chipSrcExist || medicaidSrcExist) return true;
        }
      }
    }
    return false;
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
