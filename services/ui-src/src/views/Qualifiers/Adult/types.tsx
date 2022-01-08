export interface ACSQualifierForm {
  PercentageEnrolledInEachDeliverySystem: { [key: string]: string }[];
  CoreSetMeasuresAuditedOrValidated: string;
  CoreSetMeasuresAuditedOrValidatedDetails: {
    WhoConductedAuditOrValidation: string;
    MeasuresAuditedOrValidated: string[];
  }[];
  WasExternalContractorUsed: string;
  ExternalContractorsUsed: string[];
}
