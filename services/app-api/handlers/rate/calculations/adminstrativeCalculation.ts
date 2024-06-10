import { RateCalculation } from "./rateCalculation";
import { DataSource, UniqMeasureAbbr } from "./types";

export class AdminstrativeCalculation extends RateCalculation {
  dataSrcMap: any[] = [
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
  check(arr: any[]): boolean {
    const dataSources: any = {};

    //convert the data src to key value object for easier matching later
    arr.forEach((data) => {
      dataSources[data.column] = data.dataSource;
    });

    //if the user had selected hybrid as a data source, we will not use this calculation
    const isHybrid = Object.values(dataSources).some((srcs: any) => {
      return (srcs as string[])?.includes(DataSource.Hybrid);
    });

    if (!isHybrid) {
      for (var i = 0; i < this.dataSrcMap.length; i++) {
        const dataSrc = this.dataSrcMap[i];
        const chipSrcExist = dataSrc.CHIP.every(
          (chipSrc: string) => dataSources.CHIP.indexOf(chipSrc) > -1
        );
        const medicaidSrcExist = dataSrc.Medicaid.every(
          (medSrc: string) => dataSources.Medicaid?.indexOf(medSrc) > -1
        );
        //if data source is a match in both CHIP & medicaid return true
        if (chipSrcExist && medicaidSrcExist) {
          return true;
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
