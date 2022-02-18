export interface DefinitionOfPopulation {
  DefinitionOfDenominator: string[];
  "DefinitionOfDenominator-Other": string;
  ChangeInPopulationExplanation: string;
  DenominatorDefineTotalTechSpec: string;
  "DenominatorDefineTotalTechSpec-No-Explanation": string;
  "DenominatorDefineTotalTechSpec-No-Size": string;
  DeliverySysRepresentationDenominator: string[];
  "DeliverySys-FreeForService": string;
  "DeliverySys-FreeForService-No-Percent": string;
  "DeliverySys-FreeForService-No-Population": string;
  "DeliverySys-PrimaryCareManagement": string;
  "DeliverySys-PrimaryCareManagement-No-Percent": string;
  "DeliverySys-PrimaryCareManagement-No-Population": string;
  "DeliverySys-MCO_POHP": string;
  "DeliverySys-MCO_POHP-Percent": string;
  "DeliverySys-MCO_POHP-NumberOfPlans": string;
  "DeliverySys-MCO_POHP-No-Included": string;
  "DeliverySys-MCO_POHP-No-Excluded": string;
  "DeliverySys-IntegratedCareModel": string;
  "DeliverySys-IntegratedCareModel-No-Percent": string;
  "DeliverySys-IntegratedCareModel-No-Population": string;
  "DeliverySys-Other": string;
  "DeliverySys-Other-Percent": string;
  "DeliverySys-Other-NumberOfHealthPlans": string;
  "DeliverySys-Other-Population": string;
}


export interface WhyAreYouNotReporting {
  WhyAreYouNotReporting: string[];
  AmountOfPopulationNotCovered: string;
  PopulationNotCovered: string;
  PartialPopulationNotCoveredExplanation: string;
  WhyIsDataNotAvailable: string;
  "WhyIsDataNotAvailable-Other": string;
  DataIconAccuracyIssues: string;
  DataSourceNotEasilyAccessible: string;
  "DataSourceNotEasilyAccessible-Other": string;
  InformationNotCollected: string;
  "InformationNotCollected-Other": string;
  LimitationWithDatCollecitonReportAccuracyCovid: string;
  SmallSampleSizeLessThan30: string;
  "WhyAreYouNotReporting-Other": string;
}

export interface DidReport {
  DidReport: string;
}

export interface StatusOfData {
    DataStatus: string[];
    "DataStatus-ProvisionalExplanation": string;

}
