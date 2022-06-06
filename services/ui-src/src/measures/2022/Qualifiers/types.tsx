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

export interface AuditDetails {
  WhoConductedAuditOrValidation: string;
  MeasuresAuditedOrValidated: string[];
}
