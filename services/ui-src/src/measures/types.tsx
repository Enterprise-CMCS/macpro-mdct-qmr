export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    handleSubmit: any;
  }

  interface RateFields {
    numerator: string;
    denominator: string;
    rate: string;
  }

  interface AggregateRate {
    subRate: RateFields[];
    total: RateFields[];
  }

  export interface Form {
    //Report
    DidReport: string;

    //Status
    DataStatus: string[];
    "DataStatus-ProvisionalExplanation": string;

    //DataSource
    DataSource: string[];
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

    //CombinedRates
    CombinedRates: string;
    "CombinedRates-CombinedRates": string;
    "CombinedRates-CombinedRates-Other-Explanation": string;

    //MeasurementSpecification
    MeasurementSpecification: string;
    "MeasurementSpecification-HEDISVersion": string;
    "MeasurementSpecification-OtherMeasurementSpecificationDescription": string;
    "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload": File;

    //WhyAreYouNotReporting
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

    //Other Performance Measure
    "OtherPerformanceMeasure-Explanation": string;
    "OtherPerformanceMeasure-Rates": string[];
    "OtherPerformanceMeasure-Notes": string;
    "OtherPerformanceMeasure-Rates-TextInput": string;

    //AdditionalNotes
    "AdditionalNotes-AdditionalNotes"?: string;
    "AdditionalNotes-Upload"?: File[];

    //DefinitionOfPopulation
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

    //DeviationFromMeasureSpec
    DidCalculationsDeviate: string;
    DeviationOptions: string[];
    DeviationFields: {
      options: string[];
      denominator: string;
      numerator: string;
      other: string;
    };

    //OptionalMeasureStratification
    CategoriesReported: string[];

    AddtnlEthnicity: string[];
    AddtnlEthnicityRates: AggregateRate[];

    AddtnlNonHispanicRace: string[];
    AddtnlNonHispanicRaceAggregation: string[];
    AddtnlNonHispanicRaceRates: AggregateRate[];

    AddtnlNonHispanicSubCat: string[];
    AddtnlNonHispanicSubCatRates: AggregateRate[];

    NonHispanicRacialCategories: string[];
    "NHRC-WhiteRates": AggregateRate;
    "NHRC-BlackOrAfricanAmericanRates": AggregateRate;
    "NHRC-AmericanIndianOrAlaskaNativeRates": AggregateRate;
    "NHRC-AggregateAsianRates": AggregateRate;
    "NHRC-IndependentAsianRates": AggregateRate[];
    "NHRC-AggregateHawaiianOrPacificIslanderRates": AggregateRate;
    "NHRC-IndependentHawaiianOrPacificIslanderRates": AggregateRate[];

    EthnicityCategories: string[];
    NonHispanicEthnicityRates: AggregateRate;
    HispanicIndependentReporting: string;
    HispanicEthnicityAggregateRate: AggregateRate;
    IndependentHispanicOptions: string[];
    IndependentHispanicRates: AggregateRate[];

    AsianIndependentReporting: string;
    IndependentAsianOptions: string[];
    NativeHawaiianIndependentReporting: string;
    IndependentNativeHawaiianOptions: string[];

    SexOptions: string[];
    MaleSexRates: AggregateRate;
    FemaleSexRates: AggregateRate;

    PrimaryLanguageOptions: string[];
    AddtnlPrimaryLanguage: string[];
    AddtnlPrimaryLanguageRates: AggregateRate[];
    EnglishLanguageRate: AggregateRate;
    SpanishLanguageRate: AggregateRate;

    DisabilityStatusOptions: string[];
    DisabilitySSIRate: AggregateRate;
    DisabilityNonSSIRate: AggregateRate;
    AddtnlDisabilityStatusDesc: string;
    AddtnlDisabilityRate: AggregateRate;

    GeographyOptions: string[];
    UrbanGeographyRate: AggregateRate;
    RuralGeographyRate: AggregateRate;
    AddtnlGeographyDesc: string;
    AddtnlGeographyRate: AggregateRate;

    ACAGroupRate: AggregateRate;
  }
}
