import { DataSourceData } from "./DataSource/data";
import { OmsNode } from "./OptionalMeasureStrat/data";
import { PerformanceMeasureData } from "./PerformanceMeasure/data";

export interface MeasureWrapperProps {
  name: string;
  year: string;
  measureId: string;
  setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  isOtherMeasureSpecSelected?: boolean;
  isPrimaryMeasureSpecSelected?: boolean;
  showOptionalMeasureStrat?: boolean;
  isNotReportingData?: boolean;
}

type YesNo = "yes" | "no";

export interface MeasurementSpecification {
  MeasurementSpecification: "NCQA/HEDIS" | "OPA" | "AHRQ" | "CMS" | "Other"; // Selected Measurement Specification
  "MeasurementSpecification-HEDISVersion": // if Measure Spec is NCQA/HEDIS -> which version are they using
  "HEDIS MY 2020" | "HEDIS 2020" | "HEDIS 2019";
  "MeasurementSpecification-OtherMeasurementSpecificationDescription": string; // If user selects "Other measurement specification" -> this is the description
  "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload": File; // If user selects "Other measurement specification" -> this is optional file upload
}

export interface DefinitionOfPopulation {
  DefinitionOfDenominator: Array<
    | "DenominatorIncMedicaidPop"
    | "DenominatorIncCHIP"
    | "DenominatorIncMedicareMedicaidDualEligible"
    | "DenominatorIncOther"
  >;
  "DefinitionOfDenominator-Other": string; // if "DenominatorIncOther" selected in "DefinitionOfDenominator" -> an explaination
  ChangeInPopulationExplanation: string; // text explaination of change in polulation
  DenominatorDefineTotalTechSpec: YesNo; // Does this denominator represent your total measure-eligible population
  "DenominatorDefineTotalTechSpec-No-Explanation": string; // if "no" selected in "DenominatorDefineTotalTechSpec" - > explaination which populations are excluded
  "DenominatorDefineTotalTechSpec-No-Size": string; // if "no" selected in "DenominatorDefineTotalTechSpec" - > explaination of the size of population excluded
  DeliverySysRepresentationDenominator: Array<
    "FFS" | "PCCM" | "MCO-PIHP" | "ICM" | "Other" // which delivery systems are represented in the denominator
  >;
  "DeliverySys-FeeForService": YesNo; // If "FFS" selected in "DeliverySysRepresentationDenominator" -> Is all of your FFS population included in this measure?"
  "DeliverySys-FeeForService-No-Percent": string; // If "no" in "DeliverySys-FeeForService" -> what percent included in measure
  "DeliverySys-FeeForService-No-Population": string; // If "no" in "DeliverySys-FeeForService" -> what number of your FFS population are included in the measure?
  "DeliverySys-PrimaryCareManagement": YesNo; // If "PCCM" selected in "DeliverySysRepresentationDenominator" -> Is all of your PCCM population included in this measure?"
  "DeliverySys-PrimaryCareManagement-No-Percent": string; // If "no" in "DeliverySys-PrimaryCareManagement" -> what percent included in measure
  "DeliverySys-PrimaryCareManagement-No-Population": string; // if "no" in "DeliverySys-PrimaryCareManagement" -> what number of your PCCM population are included in the measure?
  "DeliverySys-MCO_PIHP-Percent": string; // If "MCO-PIHP" selected in "DeliverySysRepresentationDenominator" -> what percent
  "DeliverySys-MCO_PIHP-NumberOfPlans": string; // If "MCO-PIHP" selected in "DeliverySysRepresentationDenominator" -> what number
  "DeliverySys-MCO_PIHP": YesNo; // If "MCO-PIHP" selected in "DeliverySysRepresentationDenominator" and Is all of your MCO-PIHP population included in this measure?
  "DeliverySys-MCO_PIHP-No-Included": string; // If "no" in "DeliverySys-MCO_PIHP" -> percentage included
  "DeliverySys-MCO_PIHP-No-Excluded": string; // If "no" in "DeliverySys-MCO_PIHP" -> number excluded
  "DeliverySys-IntegratedCareModel": YesNo; // If "ICM" selected in "DeliverySysRepresentationDenominator" -> Is all of your ICM population included in this measure?"
  "DeliverySys-IntegratedCareModel-No-Percent": string; // If "no" in "DeliverySys-IntegratedCareModel" -> what percent included in measure
  "DeliverySys-IntegratedCareModel-No-Population": string; // If "no" in "DeliverySys-IntegratedCareModel" -> what number of your ICM population are included in the measure?
  "DeliverySys-Other": string; // If "Other" selected in "DeliverySysRepresentationDenominator" -> describe the denominator
  "DeliverySys-Other-Percent": string; // If "Other" selected in "DeliverySysRepresentationDenominator" -> percentage represented
  "DeliverySys-Other-NumberOfHealthPlans": string; // If "Other" selected in "DeliverySysRepresentationDenominator" -> number of health plans represented
  "DeliverySys-Other-Population": string; // If "Other" selected in "DeliverySysRepresentationDenominator" -> number of population represented
}

export interface AdditionalNotes {
  "AdditionalNotes-AdditionalNotes": string; // Additional notes or comments on the measure
  "AdditionalNotes-Upload": File[]; // Additional attachments upload
}

export interface CombinedRates {
  CombinedRates?: YesNo; // if the user combined rates from multiple reporting units
  "CombinedRates-CombinedRates"?: // if the user combined rates -> the reporting units they combined
  | "Combined Not Weighted Rates"
    | "Combined Weighted Rates"
    | "Combined Weighted Rates Other";
  "CombinedRates-CombinedRates-Other-Explanation"?: string; // if the user selected "Combined Weighted Rates Other" -> the explaination of the other weighing factor
}

export interface OtherPerformanceMeasure {
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
  // if a user is not reporting -> the reason(s) they are not reporting
  WhyAreYouNotReporting: Array<
    | "ServiceNotCovered"
    | "PopulationNotCovered"
    | "DataNotAvailable"
    | "LimitationWithDatCollecitonReportAccuracyCovid"
    | "SmallSampleSizeLessThan30"
    | "Other"
  >;

  AmountOfPopulationNotCovered: // if "PopulationNotCovered" selected in "WhyAreYouNotReporting"
  "EntirePopulationNotCovered" | "PartialPopulationNotCovered";

  PartialPopulationNotCoveredExplanation: string; // if "PartialPopulationNotCovered" in "WhyAreYouNotReporting" selected -> explaination of the population not covered

  // if "DataNotAvailable" selected in "WhyAreYouNotReporting"
  WhyIsDataNotAvailable: Array<
    | "BudgetConstraints"
    | "StaffConstraints"
    | "DataSourceNotEasilyAccessible"
    | "DataInconsistenciesAccuracyIssues"
    | "InformationNotCollected"
    | "Other"
  >;
  "WhyIsDataNotAvailable-Other": string; // if "Other" selected in "WhyIsDataNotAvailable" -> an explaination
  DataInconsistenciesAccuracyIssues: string; // if "DataInconsistenciesAccuracyIssues" selected in "WhyIsDataNotAvailable" -> an explaination
  DataSourceNotEasilyAccessible: Array<
    "RequiresMedicalRecordReview" | "RequireDataLinkage" | "Other" // if "DataSourceNotEasilyAccessible" selected in "WhyIsDataNotAvailable"
  >;
  "DataSourceNotEasilyAccessible-Other": string; // if "Other" selected in "DataSourceNotEasilyAccessible" -> an explaination
  InformationNotCollected: Array<
    "NotCollectedByProviderHospitalHealthPlan" | "Other"
  >;
  "InformationNotCollected-Other": string; // if "Other" selected in "InformationNotCollected" -> an explaination
  LimitationWithDatCollecitonReportAccuracyCovid: string; // if "LimitationWithDatCollecitonReportAccuracyCovid" selected in "WhyAreYouNotReporting" -> an explaination
  SmallSampleSizeLessThan30: string; // if "SmallSampleSizeLessThan30" in "WhyAreYouNotReporting" -> an explaination of sample size
  "WhyAreYouNotReporting-Other": string; // if "Other" selected in "WhyAreYouNotReporting" -> an explaination
}

export interface DidReport {
  DidReport: YesNo;
}

export interface DidCollect {
  DidCollect: YesNo;
}

export interface StatusOfData {
  DataStatus: string[];
  "DataStatus-ProvisionalExplanation": string;
}

export interface DataSource {
  DataSource: string[];
  DataSourceSelections: {
    [label: string]: {
      description: string;
      selected: string[];
    };
  };
  DataSourceDescription: string;
}
export interface RateFields {
  label?: string;
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

export type PerformanceMeasureRate = {
  [label: string]: RateFields[] | undefined;
};

export interface PerformanceMeasure {
  PerformanceMeasure?: {
    explanation?: string;
    rates?: PerformanceMeasureRate;
  };
}

interface OmsRateFields {
  options?: string[];
  rates?: {
    [
      rateLabel: string /** rate label will be some combination of ageRange_perfDesc or opmFieldLabel */
    ]: RateFields[];
  };
  total?: RateFields[];
}

interface LowLevelOmsNode {
  ageRangeRates?: OmsRateFields; // if just ndr sets
  subCatOptions?: string[]; // for additional subCats/add anothers
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

export interface Qualifiers {
  qualifiers?: string[];
}

export interface Categories {
  categories?: string[];
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
  export type OptionalMeasureStrat = OmsNode[];
  export type PerformanceMeasure = PerformanceMeasureData;
  export type DataSource = DataSourceData;
}

export interface DeviationFromMeasureSpecification {
  DidCalculationsDeviate: YesNo; // does the calculation of the measure deviate from the measure specification
  DeviationOptions: string[]; // if "YesCalcDeviated" selected from "DidCalculationsDeviate" -> which deviations options selected
  Deviations: {
    // the Deviation 'options' below will match the "DeviationOptions" above
    [option: string]: {
      RateDeviationsSelected: Array<"numerator" | "denominator" | "other">; // deviations selected for the given option
      numerator: string; // if "numerator" selected for "RateDeviationsSelected" -> an explaination
      denominator: string; // if "denominator" selected for "RateDeviationsSelected" -> an explaination
      other: string; // if "other" selected for "RateDeviationsSelected" -> an explaination
    };
  };
}
export type DefaultFormData = AdditionalNotes &
  DidCollect &
  StatusOfData &
  WhyAreYouNotReporting &
  DidReport &
  CombinedRates &
  DateRange &
  DefinitionOfPopulation &
  MeasurementSpecification &
  OtherPerformanceMeasure &
  OptionalMeasureStratification &
  PerformanceMeasure &
  DeviationFromMeasureSpecification &
  DataSource;
