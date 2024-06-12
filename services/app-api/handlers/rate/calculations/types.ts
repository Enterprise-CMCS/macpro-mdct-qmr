import { Measure, Program } from "../../../types";

export enum DataSource {
  Administrative = "AdministrativeData",
  EHR = "ElectronicHealthRecords",
  Hybrid = "HybridAdministrativeandMedicalRecordsData",
}

export enum UniqMeasureAbbr {
  AMB = "AMB",
  PQI = "PQI",
  AAB = "AAB",
}

export interface FormattedMeasureData {
  column: Program;
  dataSource: NonNullable<NonNullable<Measure["data"]>["DataSource"]>;
  dataSourceSelections: NonNullable<
    NonNullable<Measure["data"]>["DataSourceSelections"]
  >;
  rates: NonNullable<
    NonNullable<NonNullable<Measure["data"]>["PerformanceMeasure"]>["rates"]
  >;
}
