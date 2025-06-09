export interface DataDriven {
  title: string;
  formData: any;
  questionTitle: string;
  qualifierHeader: (year: string) => string;
  textTable: string[][];
  fieldValues: string[];
}

interface BaseQualifierForm {
  GeneralAge?: string;
  AdministrativeData: AdministrativeQuestions;
  CostSavingsData: CostSavingsData;
  PercentageEnrolledInEachDeliverySystem: DeliverySystem[];
  CoreSetMeasuresAuditedOrValidated: string;
  CoreSetMeasuresAuditedOrValidatedDetails: AuditDetails[];
  WasExternalContractorUsed: string;
  ExternalContractorsUsed: string[];
  OtherContractorDetails: string;
}

export interface HHCSQualifierForm extends BaseQualifierForm {}

export interface ACSQualifierForm extends BaseQualifierForm {}

export interface ACSCQualifierForm extends BaseQualifierForm {}

export interface ACSMQualifierForm extends BaseQualifierForm {}

export interface CCSQualifierForm extends BaseQualifierForm {}

export interface CCSCQualifierForm extends BaseQualifierForm {}

export interface CCSMQualifierForm extends BaseQualifierForm {}

export interface DeliverySystem {
  [type: string]: any;
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
