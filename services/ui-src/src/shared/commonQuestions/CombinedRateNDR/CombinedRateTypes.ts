/**
 * This is the shape of data saved to the Rates table
 */
export type CombinedRatesPayload = {
  DataSources: {
    Medicaid: DataSourcePayload;
    CHIP: DataSourcePayload;
  };
  Rates: {
    uid: string;
    category?: string;
    label?: string;
    Medicaid: WeightedRateShape;
    CHIP: WeightedRateShape;
    Combined: WeightedRateShape;
  }[];
  AdditionalValues: {
    uid: string;
    label: string;
    Medicaid: number | undefined;
    CHIP: number | undefined;
    Combined: number | undefined;
  }[];
};
type DataSourcePayload = {
  includesHybrid: boolean;
  DataSource: DataSource[];
  DataSourceSelections: unknown[];
};
export type WeightedRateShape = {
  numerator?: number;
  denominator?: number;
  rate?: number;
  population?: number;
  weightedRate?: number;
};
enum DataSource {
  Administrative = "AdministrativeData",
  EHR = "ElectronicHealthRecords",
  Hybrid = "HybridAdministrativeandMedicalRecordsData",
  CaseMagementRecordReview = "Casemanagementrecordreview",
}
