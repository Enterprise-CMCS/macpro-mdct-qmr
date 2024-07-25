import { RateCalculation } from "./rateCalculation";
import { DataSource, FormattedMeasureData, UniqMeasureAbbr } from "./types";

export class HybridOtherCalculation extends RateCalculation {
  dataSrcMap = [
    {
      Medicaid: [DataSource.Administrative],
      CHIP: [DataSource.Hybrid],
    },
    {
      Medicaid: [DataSource.Administrative], //case management
      CHIP: [DataSource.Administrative],
    },
    {
      Medicaid: [DataSource.Hybrid],
      CHIP: [DataSource.Administrative],
    },
    {
      Medicaid: [DataSource.Administrative, DataSource.Hybrid],
      CHIP: [DataSource.Administrative],
    },
    {
      Medicaid: [DataSource.Administrative, DataSource.Hybrid],
      CHIP: [DataSource.Hybrid],
    },
    {
      Medicaid: [DataSource.Administrative, DataSource.Hybrid],
      CHIP: [DataSource.Administrative, DataSource.Hybrid],
    },
    {
      Medicaid: [DataSource.Administrative],
      CHIP: [DataSource.Administrative, DataSource.Hybrid],
    },
    {
      Medicaid: [DataSource.Hybrid],
      CHIP: [DataSource.Administrative, DataSource.Hybrid],
    },
    {
      Medicaid: [DataSource.Administrative, DataSource.Hybrid, DataSource.EHR],
      CHIP: [DataSource.Administrative],
    },
    {
      Medicaid: [DataSource.Administrative, DataSource.Hybrid, DataSource.EHR],
      CHIP: [DataSource.Hybrid],
    },
  ];
  check(arr: FormattedMeasureData[]): boolean {
    return false;
  }

  getFormula(measure: string): Function {
    return () => {};
  }
}
