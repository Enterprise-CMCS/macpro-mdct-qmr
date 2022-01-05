export namespace Qualifier {
  export interface Form {
    deliverySystem: { [key: string]: string }[];
    isAudited: string;
    whoAudited: string[];
    hasExternalContractor: string;
    audit: any[];
    contractorType: string[];
    otherContractorDetails: string;
  }
}
