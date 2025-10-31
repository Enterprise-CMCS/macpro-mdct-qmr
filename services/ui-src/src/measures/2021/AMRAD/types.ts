import React from "react";
import * as Types from "shared/types";

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

  export interface Form
    extends Types.MeasurementSpecification,
      Types.AdditionalNotes,
      Types.CombinedRates,
      Types.DateRange,
      Types.DefinitionOfPopulation,
      Types.StatusOfData,
      Types.DidReport,
      Types.WhyAreYouNotReporting,
      Types.DataSource,
      Types.PerformanceMeasure,
      Types.DeviationFromMeasureSpecificationCheckboxes,
      Types.OtherPerformanceMeasure {
    "PerformanceMeasure-Explanation": string;
    "PerformanceMeasure-AgeRates-Persistent-Asthma": {
      denominator: string;
      numerator: string;
      other: string;
      id: string;
      label: string;
      rate: string;
    }[];

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
