export interface ACSQualifierForm {
  // PercentageEnrolledInEachDeliverySystem: { [key: string]: string }[];
  PercentageEnrolledInEachDeliverySystem: any;
  CoreSetMeasuresAuditedOrValidated: string;
  CoreSetMeasuresAuditedOrValidatedDetails: {
    WhoConductedAuditOrValidation: string;
    MeasuresAuditedOrValidated: string[];
  }[];
  WasExternalContractorUsed: string;
  ExternalContractorsUsed: string[];
}
