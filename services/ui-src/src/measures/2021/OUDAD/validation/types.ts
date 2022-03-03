import * as Types from "../measures/CommonQuestions/types";
export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    measureId: string;
    setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  }

  interface AggregateRate {
    subRate: Types.RateFields[];
    total: Types.RateFields[];
  }

  export interface Form
    extends Types.DefinitionOfPopulation,
      Types.DateRange,
      Types.DidReport,
      Types.WhyAreYouNotReporting,
      Types.StatusOfData,
      Types.AdditionalNotes,
      Types.CombinedRates,
      Types.OtherPerformanceMeasure,
      Types.DataSource,
      Types.MeasurementSpecification,
      Types.PerformanceMeasure,
      Types.DeviationFromMeasureSpecification {
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
