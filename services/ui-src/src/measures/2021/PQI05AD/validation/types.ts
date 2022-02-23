import * as Types from "../../CommonQuestions/types";

export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    measureId: string;
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
    description: string;
    rate: RateFields[];
  }

  export interface Form
    extends Types.DefinitionOfPopulation,
      Types.DateRange,
      Types.DidReport,
      Types.WhyAreYouNotReporting,
      Types.StatusOfData,
      Types.CombinedRates,
      Types.AdditionalNotes,
      Types.OtherPerformanceMeasure,
      Types.MeasurementSpecification {
    //DataSource
    DataSource: string[];
    "DataSource-Administrative"?: string[];
    "DataSource-Administrative-Other"?: string;
    "DataSource-Administrative-Other-Explanation"?: string;
    "DataSource-Other": string;
    "DataSource-Other-Explanation": string;

    //Other Performance Measure
    "OtherPerformanceMeasure-Explanation": string;
    "OtherPerformanceMeasure-Rates": OtherRatesFields[];
    "OtherPerformanceMeasure-Notes": string;
    "OtherPerformanceMeasure-Rates-TextInput": string;

    //DeviationFromMeasureSpec
    DidCalculationsDeviate: string;
    DeviationOptions: string[];
    "DeviationOptions-AgeRanges": string[];
    DeviationFields: {
      options: string[];
      denominator: string;
      numerator: string;
      other: string;
    };

    "PerformanceMeasure-Explanation": string;
    "PerformanceMeasure-AgeRates": {
      denominator: string;
      numerator: string;
      other: string;
      id: string;
      label: string;
      rate: string;
    }[];

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
  }
}
