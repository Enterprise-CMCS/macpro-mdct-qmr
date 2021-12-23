export namespace Measure {
  export interface Props {
    name: string;
    year: string;
  }

  export interface Form {
    DidReport: string;
    DataStatus: string[];
    DataSource: string[];
    "DataStatus-ProvisionalExplanation": string;
    "DataSource-Administrative"?: string[];
    "DataSource-Administrative-Other"?: string;
    "DataSource-Administrative-Other-Explanation"?: string;
    "DataSource-Other": string;
    "DataSource-Other-Explanation": string;
    "DataSource-Hybrid"?: string[];
    "DataSource-Hybrid-Other"?: string;
    "DataSource-Hybrid-Other-Explanation"?: string;
    "DataSource-Hybrid-MedicalRecord-DataSoruce"?: string;
    "DataSource-ElectronicHealthRecords"?: string;
    "DataSource-ElectronicHealthRecords-Explanation"?: string;
    CombinedRates: string;
    "CombinedRates-CombinedRates": string;
    "CombinedRates-CombinedRates-Other-Explanation": string;
    MeasurementSpecification: string;
    "MeasurementSpecification-HEDISVersion": string;
    "MeasurementSpecification-OtherMeasurementSpecificationDescription": string;
    "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload": File;
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
    "OtherPerformanceMeasure-Explanation": string;
    "OtherPerformanceMeasure-Rates": string[];
    "OtherPerformanceMeasure-Notes": string;
    "OtherPerformanceMeasure-Rates-TextInput": string;
    "AdditionalNotes-AdditionalNotes"?: string;
    "AdditionalNotes-Upload"?: File[];
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
    DidCalculationsDeviate: string;
    DeviationOptions: string[];
    DeviationFields: {
      options: string[];
      denominator: string;
      numerator: string;
      other: string;
    };
  }
}
