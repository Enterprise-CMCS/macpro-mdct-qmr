import { HybridCalculation } from "./hybridCalculation";
import { DataSource } from "./types";

export class HybridOtherCalculation extends HybridCalculation {
  dataSrcMap = [
    {
      Medicaid: [DataSource.Administrative],
      CHIP: [DataSource.Hybrid],
    },
    {
      Medicaid: [DataSource.CaseMagementRecordReview],
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
}
