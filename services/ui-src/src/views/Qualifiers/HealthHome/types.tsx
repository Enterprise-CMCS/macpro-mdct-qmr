export interface HHCSQualifierForm {
  AdministrativeData: AdministrativeQuestions;
  CostSavingsData: CostSavingsData;
  PercentageEnrolledInEachDeliverySystem: DeliverySystem[];
  CoreSetMeasuresAuditedOrValidated: string;
  CoreSetMeasuresAuditedOrValidatedDetails: AuditDetails[];
  WasExternalContractorUsed: string;
  ExternalContractorsUsed: string[];
  OtherContractorDetails: string;
}

export interface DeliverySystem {
  label: string;
  ZeroToSeventeen: string;
  EighteenToSixtyFour: string;
  GreaterThanSixtyFive: string;
  userGenerated: boolean;
}

export interface AdministrativeQuestions {
  numberOfAdults: string;
  minAgeOfAdults: string;
  numberOfChildren: string;
  maxAgeChildren: string;
  numberOfIndividuals: string;
  numberOfProviders: string;
}

export interface CostSavingsData {
  yearlyCostSavings: number;
  costSavingsMethodology: string;
  costSavingsFile: File[];
}

export interface AuditDetails {
  WhoConductedAuditOrValidation: string;
  MeasuresAuditedOrValidated: string[];
}
