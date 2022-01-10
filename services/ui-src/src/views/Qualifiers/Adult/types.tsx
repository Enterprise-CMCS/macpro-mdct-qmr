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

export type DeliverySystemType = "default" | "custom";

export interface DeliverySystem {
  key: string;
  label: string;
  TwentyOneToSixtyFour: string;
  GreaterThanSixtyFour: string;
  type: DeliverySystemType;
}
