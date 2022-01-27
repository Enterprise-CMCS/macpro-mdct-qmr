export interface CCSQualifierForm {
  PercentageEnrolledInEachDeliverySystem: DeliverySystem[];
  CoreSetMeasuresAuditedOrValidated: string;
  CoreSetMeasuresAuditedOrValidatedDetails: AuditDetails[];
  WasExternalContractorUsed: string;
  ExternalContractorsUsed: string[];
  OtherContractorDetails: string;
}

export interface DeliverySystem {
  key: string;
  label: string;
  UnderTwentyOneMedicaid: string;
  UnderTwentyOneCHIP: string;
  userGenerated: boolean;
}

export interface AuditDetails {
  WhoConductedAuditOrValidation: string;
  MeasuresAuditedOrValidated: string[];
}
