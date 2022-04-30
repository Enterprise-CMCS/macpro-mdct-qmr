import { integer } from "aws-sdk/clients/storagegateway";

export interface HHCSQualifierForm {
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
  numberOfAdults: integer;
  minAgeOfAdults: integer;
  numberOfChildren: integer;
  maxAgeChildren: integer;
  numberOfIndividuals: integer;
  numberOfProviders: integer;
}

export interface CostSavingsData {
  yearlyCostSavings: integer;
  costSavingsMethodology: string;
  costSavingsFile: File[];
}

export interface AuditDetails {
  WhoConductedAuditOrValidation: string;
  MeasuresAuditedOrValidated: string[];
}
