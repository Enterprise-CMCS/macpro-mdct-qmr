import { OmsDataNode } from "./OptionalMeasureStrat";

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

export interface AdditionalNotes {
  "AdditionalNotes-AdditionalNotes": string;
  "AdditionalNotes-Upload": File[];
}
export interface CombinedRates {
  CombinedRates: string;
  "CombinedRates-CombinedRates": string;
  "CombinedRates-CombinedRates-Other-Explanation": string;
}

export interface OtherPerformanceMeasure {
  //Other Performance Measure
  "OtherPerformanceMeasure-Explanation": string;
  "OtherPerformanceMeasure-Rates": OtherRatesFields[];
  "OtherPerformanceMeasure-Notes": string;
  "OtherPerformanceMeasure-Rates-TextInput": string;
}
export interface DateRange {
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

export interface RateFields {
  numerator?: string;
  denominator?: string;
  rate?: string;
}

export interface DeviationFields {
  options: string[];
  denominator: string;
  numerator: string;
  other: string;
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

export interface AgeGroups {
  ageGroups: string[];
}

export interface PerformanceMeasureDescriptions {
  performanceMeasureDescriptions: string[];
}

export interface OptionalMeasureStratification {
  OptionalMeasureStratification: {
    options: string[]; //checkbox
    selections: {
      [option: string]: TopLevelOmsNode;
    };
  };
}

export namespace DataDrivenTypes {
  export type OptionalMeasureStrat = OmsDataNode[];
}
