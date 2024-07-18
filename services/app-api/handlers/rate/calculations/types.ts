import { Measure, Program, StandardRateShape } from "../../../types";

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
  dataSource: DataSource[];
  dataSourceSelections: NonNullable<
    NonNullable<Measure["data"]>["DataSourceSelections"]
  >;
  rates: {
    [key: string]: StandardRateShape[];
  };
}
