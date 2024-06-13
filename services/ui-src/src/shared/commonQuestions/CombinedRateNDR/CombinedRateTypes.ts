export type Program = "CHIP" | "Medicaid";
export type DataSource =
  | "AdministrativeData"
  | "ElectronicHealthRecords"
  | "HybridAdministrativeandMedicalRecordsData";
export type CategoryId = string;
export type QualifierId = string;

export type RateDataShape = {
  uid: `${CategoryId}.${QualifierId}`;
  label: string;
  category?: string;
  numerator?: string;
  denominator?: string;
  rate?: string;
};

export type RateCategoryMap = {
  [key: CategoryId]: RateDataShape[];
};

export type SeparatedData = {
  column: Program;
  dataSource: DataSource[];
  rates: RateCategoryMap;
};

export type CombinedData = {
  column: "Combined Rate";
  rates: RateDataShape[];
};

export type CombinedRatePayload = {
  compoundKey: string;
  measure: string;
  state: string;
  year: string;
  lastAltered: number;
  data: (SeparatedData | CombinedData)[];
};
