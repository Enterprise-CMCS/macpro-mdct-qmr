export interface ACSQualifierForm {
  PercentageEnrolledInEachDeliverySystem: DeliverySystem[];
  CoreSetMeasuresAuditedOrValidated: string;
  CoreSetMeasuresAuditedOrValidatedDetails: {
    WhoConductedAuditOrValidation: string;
    MeasuresAuditedOrValidated: string[];
  }[];
  WasExternalContractorUsed: string;
  ExternalContractorsUsed: string[];
}

export interface DeliverySystem {
  key: string;
  label: string;
  TwentyOneToSixtyFour: string;
  GreaterThanSixtyFour: string;
  type: string;
}
