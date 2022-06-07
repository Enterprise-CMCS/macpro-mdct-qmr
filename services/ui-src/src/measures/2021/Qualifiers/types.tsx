import { integer } from "aws-sdk/clients/storagegateway";

interface BaseQualifierForm {
  PercentageEnrolledInEachDeliverySystem: DeliverySystem[];
  CoreSetMeasuresAuditedOrValidated: string;
  CoreSetMeasuresAuditedOrValidatedDetails: AuditDetails[];
  WasExternalContractorUsed: string;
  ExternalContractorsUsed: string[];
  OtherContractorDetails: string;
}

export interface HHCSQualifierForm extends BaseQualifierForm {}

export interface ACSQualifierForm extends BaseQualifierForm {}

export interface CCSQualifierForm extends BaseQualifierForm {}

export interface CCSCQualifierForm extends BaseQualifierForm {}

export interface CCSMQualifierForm extends BaseQualifierForm {}

export interface DeliverySystem {
  [type: string]: any;
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
