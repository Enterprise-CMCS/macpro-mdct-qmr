export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    measureId: string;
    handleSubmit?: any;
    handleValidation?: any;
    setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
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

  interface OtherRatesFields {
    description: string[];
    rate: RateFields[];
  }

  interface LowLevelOmsNode {
    // if just ndr sets
    rates?: AggregateRate;

    // for additional subCats/add anothers
    subCatOptions?: string[];
    subCategories?: {
      description: string;
      rates: AggregateRate;
    }[];
  }

  interface MidLevelOMSNode extends LowLevelOmsNode {
    // if sub-options
    aggregate?: boolean;
    options?: string[];
    selections?: {
      [option: string]: LowLevelOmsNode;
    };
  }

  interface TopLevelOmsNode {
    // top level child, ex: Race, Sex, Ethnicity
    options?: string[]; // checkbox
    additionalCategories?: string[]; // add another section
    selections?: {
      [option: string]: MidLevelOMSNode;
    };
    additionalSelections?: AddtnlOmsNode[];

    // catch case for ACA
    rates?: AggregateRate;
  }

  interface AddtnlOmsNode extends LowLevelOmsNode {
    description: string;
  }

  interface DeviationFields {
    options: string[];
    denominator: string;
    numerator: string;
    other: string;
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
    "DataSource-Electronic": string;
    "DataSource-Electronic-Explanation": string;
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
    "OtherPerformanceMeasure-Rates": OtherRatesFields[];
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
    "DeviationOptions-InitAlcohol-AgeRange": string[];
    "DeviationFields-InitAlcohol": DeviationFields;

    "DeviationOptions-EngageAlcohol-AgeRange": string[];
    "DeviationFields-EngageAlcohol": DeviationFields;

    "DeviationOptions-InitOpioid-AgeRange": string[];
    "DeviationFields-InitOpioid": DeviationFields;

    "DeviationOptions-EngageOpioid-AgeRange": string[];
    "DeviationFields-EngageOpioid": DeviationFields;

    "DeviationOptions-InitOther-AgeRange": string[];
    "DeviationFields-InitOther": DeviationFields;

    "DeviationOptions-EngageOther-AgeRange": string[];
    "DeviationFields-EngageOther": DeviationFields;

    "DeviationOptions-InitTotal-AgeRange": string[];
    "DeviationFields-InitTotal": DeviationFields;

    "DeviationOptions-EngageTotal-AgeRange": string[];
    "DeviationFields-EngageTotal": DeviationFields;

    //PerformanceMeasure
    "PerformanceMeasure-Explanation": string;
    "PerformanceMeasure-AgeRates-Initiation-Alcohol": RateFields[];
    "PerformanceMeasure-AgeRates-Engagement-Alcohol": RateFields[];
    "PerformanceMeasure-AgeRates-Initiation-Opioid": RateFields[];
    "PerformanceMeasure-AgeRates-Engagement-Opioid": RateFields[];
    "PerformanceMeasure-AgeRates-Initiation-Other": RateFields[];
    "PerformanceMeasure-AgeRates-Engagement-Other": RateFields[];
    "PerformanceMeasure-AgeRates-Initiation-Total": RateFields[];
    "PerformanceMeasure-AgeRates-Engagement-Total": RateFields[];

    //DateRange
    DateRange: {
      endDate: {
        selectedMonth: number;
        selectedYear: number;
      };
      startDate: {
        selectedMonth: number;
        selectedYear: number;
      };
    };

    //OptionalMeasureStratification
    CategoriesReported: string[];

    AddtnlEthnicity: string[];
    AddtnlEthnicityRates: AggregateRate[];

    AddtnlNonHispanicRace: string[];
    AddtnlNonHispanicRaceRates: AggregateRate[];
    AddtnlNonHispanicRaceSubCatTitle: { titles: string[] }[];
    AddtnlNonHispanicRaceSubCatOptions: string[][];
    AddtnlNonHispanicRaceSubCatRates: { rates: AggregateRate[] }[];

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
    EthnicitySubCategories: string[];
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

    OptionalMeasureStratification: {
      options: string[]; //checkbox
      selections: {
        [option: string]: TopLevelOmsNode;
      };
    };
  }
}
