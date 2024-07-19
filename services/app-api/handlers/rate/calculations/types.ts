import { Measure, Program, StandardRateShape } from "../../../types";

export enum DataSource {
  Administrative = "AdministrativeData",
  EHR = "ElectronicHealthRecords",
  Hybrid = "HybridAdministrativeandMedicalRecordsData",
  CaseMagementRecordReview = "Casemanagementrecordreview",
}

export enum UniqMeasureAbbr {
  AMB = "AMB",
  PQI = "PQI",
  AAB = "AAB",
}

export interface FormattedMeasureData {
  column: Program;
  dataSource: DataSource[];
  dataSourceSelections: NonNullable<
    NonNullable<Measure["data"]>["DataSourceSelections"]
  >;
  measurePopulation?: string;
  rates: {
    [key: string]: StandardRateShape[];
  };
}
