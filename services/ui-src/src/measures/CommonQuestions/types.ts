import { DataSourceData } from "./DataSource/data";
import { OmsNode } from "./OptionalMeasureStrat/data";
import { PerformanceMeasureData } from "./PerformanceMeasure/data";
import * as DC from "dataConstants";

type YesNo = typeof DC.YES | typeof DC.NO;

export interface MeasurementSpecification {
  [DC.MEASUREMENT_SPECIFICATION]: // Selected Measurement Specification
  | typeof DC.NCQA
    | typeof DC.OPA
    | typeof DC.AHRQ
    | typeof DC.CMS
    | typeof DC.OTHER;
  [DC.MEASUREMENT_SPECIFICATION_HEDIS]: // if Measure Spec is NCQA/HEDIS -> which version are they using
  typeof DC.HEDIS_MY_2020 | typeof DC.HEDIS_2020 | typeof DC.HEDIS_2019;
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION]: string; // If user selects "Other measurement specification" -> this is the description
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD]: File; // If user selects "Other measurement specification" -> this is optional file upload
}

export interface DefinitionOfPopulation {
  [DC.DEFINITION_OF_DENOMINATOR]: Array<
    | typeof DC.DENOMINATOR_INC_MEDICAID_POP
    | typeof DC.DENOMINATOR_INC_CHIP
    | typeof DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE
    | typeof DC.DENOMINATOR_INC_OTHER
  >;
  [DC.DEFINITION_DENOMICATOR_OTHER]: string; // if DENOMINATOR_INC_OTHER selected in DEFINITION_OF_DENOMINATOR -> an explaination
  [DC.CHANGE_IN_POP_EXPLANATION]: string; // text explaination of change in polulation
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC]: YesNo; // Does this denominator represent your total measure-eligible population
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_EXPLAIN]: string; // if "no" selected in "DenominatorDefineTotalTechSpec" - > explaination which populations are excluded
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_SIZE]: string; // if "no" selected in "DenominatorDefineTotalTechSpec" - > explaination of the size of population excluded
  [DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR]: Array<
    | typeof DC.FFS
    | typeof DC.PCCM
    | typeof DC.MCO_PIHP
    | typeof DC.ICM
    | typeof DC.OTHER // which delivery systems are represented in the denominator
  >;
  [DC.DELIVERY_SYS_FFS]: YesNo; // If "FFS" selected in "DeliverySysRepresentationDenominator" -> Is all of your FFS population included in this measure?"
  [DC.DELIVERY_SYS_FFS_NO_PERCENT]: string; // If "no" in "DeliverySys-FeeForService" -> what percent included in measure
  [DC.DELIVERY_SYS_FFS_NO_POP]: string; // If "no" in "DeliverySys-FeeForService" -> what number of your FFS population are included in the measure?
  [DC.DELIVERY_SYS_PCCM]: YesNo; // If "PCCM" selected in "DeliverySysRepresentationDenominator" -> Is all of your PCCM population included in this measure?"
  [DC.DELIVERY_SYS_PCCM_NO_PERCENT]: string; // If "no" in "DeliverySys-PrimaryCareManagement" -> what percent included in measure
  [DC.DELIVERY_SYS_PCCM_NO_POP]: string; // if "no" in "DeliverySys-PrimaryCareManagement" -> what number of your PCCM population are included in the measure?
  [DC.DELIVERY_SYS_MCO_PIHP]: YesNo; // If "MCO-PIHP" selected in "DeliverySysRepresentationDenominator" and Is all of your MCO-PIHP population included in this measure?
  [DC.DELIVERY_SYS_MCO_PIHP_PERCENT]: string; // If "MCO-PIHP" selected in "DeliverySysRepresentationDenominator" -> what percent
  [DC.DELIVERY_SYS_MCO_PIHP_NUM_PLANS]: string; // If "MCO-PIHP" selected in "DeliverySysRepresentationDenominator" -> what number
  [DC.DELIVERY_SYS_MCO_PIHP_NO_INC]: string; // If "no" in "DeliverySys-MCO_PIHP" -> percentage included
  [DC.DELIVERY_SYS_MCO_PIHP_NO_EXCL]: string; // If "no" in "DeliverySys-MCO_PIHP" -> number excluded
  [DC.DELIVERY_SYS_ICM]: YesNo; // If "ICM" selected in "DeliverySysRepresentationDenominator" -> Is all of your ICM population included in this measure?"
  [DC.DELIVERY_SYS_ICM_NO_PERCENT]: string; // If "no" in "DeliverySys-IntegratedCareModel" -> what percent included in measure
  [DC.DELIVERY_SYS_ICM_NO_POP]: string; // If "no" in "DeliverySys-IntegratedCareModel" -> what number of your ICM population are included in the measure?
  [DC.DELIVERY_SYS_OTHER]: string; // If "Other" selected in "DeliverySysRepresentationDenominator" -> describe the denominator
  [DC.DELIVERY_SYS_OTHER_PERCENT]: string; // If "Other" selected in "DeliverySysRepresentationDenominator" -> percentage represented
  [DC.DELIVERY_SYS_OTHER_NUM_HEALTH_PLANS]: string; // If "Other" selected in "DeliverySysRepresentationDenominator" -> number of health plans represented
  [DC.DELIVERY_SYS_OTHER_POP]: string; // If "Other" selected in "DeliverySysRepresentationDenominator" -> number of population represented
}

export interface AdditionalNotes {
  [DC.ADDITIONAL_NOTES]: string; // Additional notes or comments on the measure
  [DC.ADDITIONAL_NOTES_UPLOAD]: File[]; // Additional attachments upload
}

export interface CombinedRates {
  [DC.COMBINED_RATES]?: YesNo; // if the user combined rates from multiple reporting units
  [DC.COMBINED_RATES_COMBINED_RATES]?: // if the user combined rates -> the reporting units they combined
  | typeof DC.COMBINED_NOT_WEIGHTED_RATES
    | typeof DC.COMBINED_WEIGHTED_RATES
    | typeof DC.COMBINED_WEIGHTED_RATES_OTHER;
  [DC.COMBINED_WEIGHTED_RATES_OTHER_EXPLAINATION]?: string; // if the user selected "Combined Weighted Rates Other" -> the explaination of the other weighing factor
}

export interface OtherPerformanceMeasure {
  [DC.OPM_EXPLAINATION]: string;
  [DC.OPM_RATES]: OtherRatesFields[];
  [DC.OPM_NOTES]: string;
  [DC.OPM_NOTES_TEXT_INPUT]: string;
}

type MonthYear = {
  [DC.SELECTED_MONTH]: number;
  [DC.SELECTED_YEAR]: number;
};

export interface DateRange {
  [DC.DATE_RANGE]: {
    [DC.END_DATE]: MonthYear;
    [DC.START_DATE]: MonthYear;
  };
}

export interface WhyAreYouNotReporting {
  // if a user is not reporting -> the reason(s) they are not reporting
  [DC.WHY_ARE_YOU_NOT_REPORTING]: Array<
    | typeof DC.SERVICE_NOT_COVERED
    | typeof DC.POP_NOT_COVERED
    | typeof DC.DATA_NOT_AVAILABLE
    | typeof DC.LIMITATION_WITH_DATA_COLLECTION
    | typeof DC.SMALL_SAMPLE_SIZE
    | typeof DC.OTHER
  >;

  [DC.AMOUNT_OF_POP_NOT_COVERED]: // if "PopulationNotCovered" selected in "WhyAreYouNotReporting"
  typeof DC.ENTIRE_POP_NOT_COVERED | typeof DC.PARTIAL_POP_NOT_COVERED;

  [DC.PARTIAL_POP_NOT_COVERED_EXPLAINATION]: string; // if "PartialPopulationNotCovered" in "WhyAreYouNotReporting" selected -> explaination of the population not covered

  // if "DataNotAvailable" selected in "WhyAreYouNotReporting"
  [DC.WHY_IS_DATA_NOT_AVAILABLE]: Array<
    | typeof DC.BUDGET_CONSTRAINTS
    | typeof DC.STAFF_CONSTRAINTS
    | typeof DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE
    | typeof DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES
    | typeof DC.INFO_NOT_COLLECTED
    | typeof DC.OTHER
  >;
  [DC.WHY_IS_DATA_NOT_AVAILABLE_OTHER]: string; // if "Other" selected in "WhyIsDataNotAvailable" -> an explaination
  [DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES]: string; // if "DataInconsistenciesAccuracyIssues" selected in "WhyIsDataNotAvailable" -> an explaination
  [DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE]: Array<
    | typeof DC.REQUIRES_MEDICAL_RECORD_REVIEW
    | typeof DC.REQUIRES_DATA_LINKAGE
    | typeof DC.OTHER // if "DataSourceNotEasilyAccessible" selected in "WhyIsDataNotAvailable"
  >;
  [DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE_OTHER]: string; // if "Other" selected in "DataSourceNotEasilyAccessible" -> an explaination
  [DC.INFO_NOT_COLLECTED]: Array<
    typeof DC.NOT_COLLECTED_BY_PROVIDER | typeof DC.OTHER
  >;
  [DC.INFO_NOT_COLLECTED_OTHER]: string; // if "Other" selected in "InformationNotCollected" -> an explaination
  [DC.LIMITATION_WITH_DATA_COLLECTION]: string; // if "LimitationWithDatCollecitonReportAccuracyCovid" selected in "WhyAreYouNotReporting" -> an explaination
  [DC.SMALL_SAMPLE_SIZE]: string; // if "SmallSampleSizeLessThan30" in "WhyAreYouNotReporting" -> an explaination of sample size
  [DC.WHY_ARE_YOU_NOT_REPORTING_OTHER]: string; // if "Other" selected in "WhyAreYouNotReporting" -> an explaination
}

export interface DidReport {
  [DC.DID_REPORT]: YesNo;
}

export interface DidCollect {
  [DC.DID_COLLECT]: YesNo;
}

export interface StatusOfData {
  [DC.DATA_STATUS]: string[];
  [DC.DATA_STATUS_PROVISIONAL_EXPLAINATION]: string;
}

export interface DataSource {
  [DC.DATA_SOURCE]: string[];
  [DC.DATA_SOURCE_SELECTIONS]: {
    [label: string]: {
      [DC.DESCRIPTION]: string;
      [DC.SELECTED]: string[];
    };
  };
  [DC.DATA_SOURCE_DESCRIPTION]: string;
}
export interface RateFields {
  [DC.LABEL]?: string;
  [DC.NUMERATOR]?: string;
  [DC.DENOMINATOR]?: string;
  [DC.RATE]?: string;
}

export interface DeviationFields {
  [DC.OPTIONS]: string[];
  [DC.DENOMINATOR]: string;
  [DC.NUMERATOR]: string;
  [DC.OTHER]: string;
}

export interface OtherRatesFields {
  [DC.DESCRIPTION]?: string;
  [DC.RATE]?: RateFields[];
}

export type PerformanceMeasureRate = {
  [label: string]: RateFields[] | undefined;
};

export interface PerformanceMeasure {
  [DC.PERFORMANCE_MEASURE]?: {
    [DC.EXPLAINATION]?: string;
    [DC.RATES]?: PerformanceMeasureRate;
  };
}

interface OmsRateFields {
  [DC.OPTIONS]?: string[];
  [DC.RATES]?: {
    [
      rateLabel: string /** rate label will be some combination of ageRange_perfDesc or opmFieldLabel */
    ]: RateFields[];
  };
  [DC.TOTAL]?: RateFields[];
}

interface LowLevelOmsNode {
  [DC.AGE_RANGE_RATES]?: OmsRateFields; // if just ndr sets
  [DC.SUB_CAT_OPTIONS]?: string[]; // for additional subCats/add anothers
  [DC.SUB_CATS]?: {
    [DC.DESCRIPTION]?: string;
    [DC.AGE_RANGE_RATES]?: OmsRateFields;
  }[];
}

interface MidLevelOMSNode extends LowLevelOmsNode {
  // if sub-options
  [DC.AGGREGATE]?: string;
  [DC.OPTIONS]?: string[];
  [DC.SELECTIONS]?: {
    [option: string]: LowLevelOmsNode;
  };
}

interface TopLevelOmsNode {
  // top level child, ex: Race, Sex, Ethnicity
  [DC.OPTIONS]?: string[]; // checkbox
  [DC.ADDITIONAL_CATS]?: string[]; // add another section
  [DC.SELECTIONS]?: {
    [option: string]: MidLevelOMSNode;
  };
  [DC.ADDITIONAL_SELECTIONS]?: AddtnlOmsNode[];

  // catch case for ACA
  [DC.AGE_RANGE_RATES]?: OmsRateFields;
}

interface AddtnlOmsNode extends LowLevelOmsNode {
  [DC.DESCRIPTION]?: string;
}

export interface Qualifiers {
  [DC.QUALIFIERS]?: string[];
}

export interface Categories {
  [DC.CATEGORIES]?: string[];
}

export interface OptionalMeasureStratification {
  [DC.OMS]: {
    [DC.OPTIONS]: string[]; //checkbox
    [DC.SELECTIONS]: {
      [option: string]: TopLevelOmsNode;
    };
  };
}

export interface DeviationFromMeasureSpecification {
  [DC.DID_CALCS_DEVIATE]: YesNo; // does the calculation of the measure deviate from the measure specification
  [DC.DEVIATION_OPTIONS]: string[]; // if "YesCalcDeviated" selected from "DidCalculationsDeviate" -> which deviations options selected
  [DC.DEVIATIONS]: {
    // the Deviation 'options' below will match the "DeviationOptions" above
    [option: string]: {
      [DC.RATE_DEVIATIONS_SELECTED]: Array<
        typeof DC.NUMERATOR | typeof DC.DENOMINATOR | typeof DC.OTHER
      >; // deviations selected for the given option
      [DC.NUMERATOR]: string; // if "numerator" selected for "RateDeviationsSelected" -> an explaination
      [DC.DENOMINATOR]: string; // if "denominator" selected for "RateDeviationsSelected" -> an explaination
      [DC.OTHER]: string; // if "other" selected for "RateDeviationsSelected" -> an explaination
    };
  };
}

export namespace DataDrivenTypes {
  export type OptionalMeasureStrat = OmsNode[];
  export type PerformanceMeasure = PerformanceMeasureData;
  export type DataSource = DataSourceData;
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
