import * as Types from "../../CommonQuestions/types";
export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    measureId: string;
    setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  }

  export interface RateFields {
    numerator?: string;
    denominator?: string;
    rate?: string;
  }

  interface AggregateRate {
    subRate?: RateFields[];
    total?: RateFields[];
  }

  export interface OtherRatesFields {
    description?: string;
    rate?: RateFields[];
  }

  interface OmsRateFields {
    options?: string[];
    rates?: {
      /** rate label will be some combination of ageRange_perfDesc or opmFieldLabel */
      [rateLabel: string]: RateFields[];
    };
    total?: RateFields[];
  }

  interface LowLevelOmsNode {
    // if just ndr sets
    ageRangeRates?: OmsRateFields;

    // for additional subCats/add anothers
    subCatOptions?: string[];
    subCategories?: {
      description?: string;
      ageRangeRates?: OmsRateFields;
    }[];
  }

  interface MidLevelOMSNode extends LowLevelOmsNode {
    // if sub-options
    aggregate?: string;
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
    ageRangeRates?: OmsRateFields;
  }

  interface AddtnlOmsNode extends LowLevelOmsNode {
    description?: string;
  }

  interface DeviationFields {
    options: string[];
    denominator: string;
    numerator: string;
    other: string;
  }

  export interface Form
    extends Types.DefinitionOfPopulation,
      Types.DateRange,
      Types.DidReport,
      Types.WhyAreYouNotReporting,
      Types.StatusOfData,
      Types.AdditionalNotes,
      Types.CombinedRates,
      Types.OtherPerformanceMeasure {
    //DataSource
    DataSource: string[];
    "DataSource-Administrative"?: string[];
    "DataSource-Administrative-Other"?: string;
    "DataSource-Administrative-Other-Explanation"?: string;
    "DataSource-Electronic": string;
    "DataSource-Electronic-Explanation": string;
    "DataSource-Other": string;
    "DataSource-Other-Explanation": string;
    "DataSource-ElectronicHealthRecords"?: string;
    "DataSource-ElectronicHealthRecords-Explanation"?: string;

    //MeasurementSpecification
    MeasurementSpecification: string;
    "MeasurementSpecification-HEDISVersion": string;
    "MeasurementSpecification-OtherMeasurementSpecificationDescription": string;
    "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload": File;

    //Other Performance Measure
    "OtherPerformanceMeasure-Explanation": string;
    "OtherPerformanceMeasure-Rates": OtherRatesFields[];
    "OtherPerformanceMeasure-Notes": string;
    "OtherPerformanceMeasure-Rates-TextInput": string;

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
