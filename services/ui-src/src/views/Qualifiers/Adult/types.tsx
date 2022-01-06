export interface ACSQualifierForm {
  deliverySystem: { [key: string]: string }[];
  isAudited: string;
  whoAudited: string[];
  hasExternalContractor: string;
  audit: any[];
  contractorType: string[];
  otherContractorDetails: string;
}
