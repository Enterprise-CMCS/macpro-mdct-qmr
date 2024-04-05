import { OmsNode } from "shared/types";
import { PerformanceMeasureData } from "./PerformanceMeasure/data";
import * as DC from "dataConstants";
import * as Types from "shared/types";

type YesNo = typeof DC.YES | typeof DC.NO;

export interface MeasurementSpecification {
  [DC.MEASUREMENT_SPECIFICATION]: // Selected Measurement Specification
  | typeof DC.NCQA
    | typeof DC.OPA
    | typeof DC.AHRQ
    | typeof DC.CMS
    | typeof DC.OTHER
    | typeof DC.HRSA
    | typeof DC.PQA;
  [DC.MEASUREMENT_SPECIFICATION_HEDIS]: // if Measure Spec is NCQA/HEDIS -> which version are they using
  typeof DC.HEDIS_MY_2021 | typeof DC.HEDIS_MY_2020 | typeof DC.HEDIS_2020;
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION]: string; // If user selects OTHER in MEASUREMENT_SPECIFICATION -> this is the description
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD]: File; // If user selects OTHER in MEASUREMENT_SPECIFICATION -> this is optional file upload
}

export interface DefinitionOfPopulation {
  [DC.DEFINITION_OF_DENOMINATOR]: Array<
    | typeof DC.DENOMINATOR_INC_MEDICAID_POP
    | typeof DC.DENOMINATOR_INC_CHIP
    | typeof DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE
    | typeof DC.DENOMINATOR_INC_OTHER
  >;
  [DC.DEFINITION_DENOMINATOR_OTHER]: string; // if DENOMINATOR_INC_OTHER selected in DEFINITION_OF_DENOMINATOR -> an explaination
  [DC.CHANGE_IN_POP_EXPLANATION]: string; // text explaination of change in polulation
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC]: YesNo; // Does this denominator represent your total measure-eligible population?
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_EXPLAIN]: string; // if NO selected in DENOMINATOR_DEFINE_TOTAL_TECH_SPEC - > explaination which populations are excluded
  [DC.DENOMINATOR_DEFINE_HEALTH_HOME]: YesNo; // Does this denominator represent your total measure-eligible population?
  [DC.DENOMINATOR_DEFINE_HEALTH_HOME_NO_EXPLAIN]: string; // if NO selected in DENOMINATOR_DEFINE_TOTAL_TECH_SPEC - > explaination which populations are excluded
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_SIZE]: string; // if NO selected in DENOMINATOR_DEFINE_TOTAL_TECH_SPEC - > explaination of the size of population excluded
  [DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR]: Array<
    | typeof DC.FFS
    | typeof DC.PCCM
    | typeof DC.MCO_PIHP
    | typeof DC.ICM
    | typeof DC.OTHER // which delivery systems are represented in the denominator?
  >;

  [DC.HYBRID_MEASURE_POPULATION_INCLUDED]: string; // Section rendered in hybird data source measures
  [DC.HYBRID_MEASURE_SAMPLE_SIZE]: string; // Section rendered in hybird data source measures
  [DC.DEFINITION_OF_DENOMINATOR_SUBSET_EXPLAIN]: string; //Section rendered in child data source measures
  [DC.DELIVERY_SYS_FFS]: YesNo; // If FFS selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> Is all of your FFS population included in this measure?"
  [DC.DELIVERY_SYS_FFS_NO_PERCENT]: string; // If NO in DELIVERY_SYS_FFS -> what percent included in measure
  [DC.DELIVERY_SYS_FFS_NO_POP]: string; // If NO in DELIVERY_SYS_FFS -> what number of your FFS population are included in the measure?
  [DC.DELIVERY_SYS_PCCM]: YesNo; // If PCCM selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> Is all of your PCCM population included in this measure?"
  [DC.DELIVERY_SYS_PCCM_NO_PERCENT]: string; // If NO in DELIVERY_SYS_PCCM -> what percent included in measure
  [DC.DELIVERY_SYS_PCCM_NO_POP]: string; // if NO in DELIVERY_SYS_PCCM -> what number of your PCCM population are included in the measure?
  [DC.DELIVERY_SYS_MCO_PIHP]: YesNo; // If MCO-PIHP selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR and Is all of your MCO-PIHP population included in this measure?
  [DC.DELIVERY_SYS_MCO_PIHP_PERCENT]: string; // If MCO-PIHP selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> what percent
  [DC.DELIVERY_SYS_MCO_PIHP_NUM_PLANS]: string; // If MCO-PIHP selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> what number
  [DC.DELIVERY_SYS_MCO_PIHP_NO_INC]: string; // If NO in DELIVERY_SYS_MCO_PIHP -> percentage included
  [DC.DELIVERY_SYS_MCO_PIHP_NO_EXCL]: string; // If NO in DELIVERY_SYS_MCO_PIHP -> number excluded
  [DC.DELIVERY_SYS_ICM]: YesNo; // If ICM selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> Is all of your ICM population included in this measure?"
  [DC.DELIVERY_SYS_ICM_NO_PERCENT]: string; // If NO in DELIVERY_SYS_ICM -> what percent included in measure
  [DC.DELIVERY_SYS_ICM_NO_POP]: string; // If NO in DELIVERY_SYS_ICM -> what number of your ICM population are included in the measure?
  [DC.DELIVERY_SYS_OTHER]: string; // If OTHER selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> describe the denominator
  [DC.DELIVERY_SYS_OTHER_PERCENT]: string; // If OTHER selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> percentage represented
  [DC.DELIVERY_SYS_OTHER_NUM_HEALTH_PLANS]: string; // If OTHER selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> number of health plans represented
  [DC.DELIVERY_SYS_OTHER_POP]: string; // If OTHER selected in DELIVERY_SYS_REPRESENTATION_DENOMINATOR -> number of population represented
}

export interface OtherPerformanceMeasure {
  [DC.OPM_EXPLAINATION]: string;
  [DC.OPM_RATES]: OtherRatesFields[];
  [DC.OPM_NOTES]: string;
  [DC.OPM_NOTES_TEXT_INPUT]: string;
  [DC.OPM_HYBRID_EXPLANATION]?: string;
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

  [DC.AMOUNT_OF_POP_NOT_COVERED]: // if POP_NOT_COVERED selected in WHY_ARE_YOU_NOT_REPORTING
  typeof DC.ENTIRE_POP_NOT_COVERED | typeof DC.PARTIAL_POP_NOT_COVERED;

  [DC.PARTIAL_POP_NOT_COVERED_EXPLAINATION]: string; // if PARTIAL_POP_NOT_COVERED in AMOUNT_OF_POP_NOT_COVERED selected -> explaination of the population not covered

  // if DATA_NOT_AVAILABLE selected in WHY_ARE_YOU_NOT_REPORTING
  [DC.WHY_IS_DATA_NOT_AVAILABLE]: Array<
    | typeof DC.BUDGET_CONSTRAINTS
    | typeof DC.STAFF_CONSTRAINTS
    | typeof DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE
    | typeof DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES
    | typeof DC.INFO_NOT_COLLECTED
    | typeof DC.OTHER
  >;
  [DC.WHY_IS_DATA_NOT_AVAILABLE_OTHER]: string; // if OTHER selected in WHY_IS_DATA_NOT_AVAILABLE -> an explaination
  [DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES]: string; // if DATA_INCONSISTENCIES_ACCURACY_ISSUES selected in WHY_IS_DATA_NOT_AVAILABLE -> an explaination
  [DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE]: Array<
    | typeof DC.REQUIRES_MEDICAL_RECORD_REVIEW
    | typeof DC.REQUIRES_DATA_LINKAGE
    | typeof DC.OTHER // if DATA_SOURCE_NOT_EASILY_ACCESSIBLE selected in WHY_IS_DATA_NOT_AVAILABLE
  >;
  [DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE_OTHER]: string; // if OTHER selected in DATA_SOURCE_NOT_EASILY_ACCESSIBLE -> an explaination
  [DC.INFO_NOT_COLLECTED]: Array<
    typeof DC.NOT_COLLECTED_BY_PROVIDER | typeof DC.OTHER
  >;
  [DC.INFO_NOT_COLLECTED_OTHER]: string; // if OTHER selected in INFO_NOT_COLLECTED -> an explaination
  [DC.LIMITATION_WITH_DATA_COLLECTION]: string; // if LIMITATION_WITH_DATA_COLLECTION selected in WHY_ARE_YOU_NOT_REPORTING -> an explaination
  [DC.SMALL_SAMPLE_SIZE]: string; // if SMALL_SAMPLE_SIZE in WHY_ARE_YOU_NOT_REPORTING -> an explaination of sample size
  [DC.WHY_ARE_YOU_NOT_REPORTING_OTHER]: string; // if OTHER selected in WHY_ARE_YOU_NOT_REPORTING -> an explaination
}

export interface DidReport {
  [DC.DID_REPORT]: YesNo;
}

export interface DidCollect {
  [DC.DID_COLLECT]: YesNo;
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
  [DC.DATA_SOURCE_CAHPS_VERSION]?: string;
  [DC.DATA_SOURCE_CAHPS_VERSION_OTHER]?: string;
}
export interface RateFields {
  [DC.LABEL]?: string;
  [DC.NUMERATOR]?: string;
  [DC.DENOMINATOR]?: string;
  [DC.RATE]?: string;
}

export interface complexRateFields {
  [DC.LABEL]?: string;
  fields?: { [DC.LABEL]?: string; value: string | undefined }[];
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
    [DC.PMHYBRIDEXPLANATION]?: string;
  };
  [DC.PERFORMANCE_MEASURE_APPLY_ALL_AGES]?: string; // Applicable to State Specific Measures
}
export namespace OmsNodes {
  export interface OmsRateFields {
    [DC.OPTIONS]?: string[];
    [DC.RATES]?: {
      [
        category: string /** rate label will be some combination of ageRange_perfDesc or opmFieldLabel */
      ]: {
        [qualifier: string]: RateFields[];
      };
    };
    [DC.TOTAL]?: RateFields[];
  }

  export interface LowLevelOmsNode {
    [DC.RATE_DATA]?: OmsRateFields; // if just ndr sets
    [DC.SUB_CAT_OPTIONS]?: string[]; // for additional subCats/add anothers
    [DC.SUB_CATS]?: {
      [DC.DESCRIPTION]?: string;
      [DC.RATE_DATA]?: OmsRateFields;
    }[];
  }
  export interface MidLevelOMSNode extends LowLevelOmsNode {
    // if sub-options
    [DC.AGGREGATE]?: string;
    [DC.OPTIONS]?: string[];
    [DC.SELECTIONS]?: {
      [option: string]: LowLevelOmsNode;
    };
  }

  export interface TopLevelOmsNode {
    // top level child, ex: Race, Sex, Ethnicity
    [DC.OPTIONS]?: string[]; // checkbox
    [DC.ADDITIONAL_CATS]?: string[]; // add another section
    [DC.SELECTIONS]?: {
      [option: string]: MidLevelOMSNode;
    };
    [DC.ADDITIONAL_SELECTIONS]?: AddtnlOmsNode[];

    // catch case for ACA
    [DC.RATE_DATA]?: OmsRateFields;
  }

  export interface AddtnlOmsNode extends LowLevelOmsNode {
    [DC.DESCRIPTION]?: string;
  }
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
      [option: string]: OmsNodes.TopLevelOmsNode;
    };
  };
}
export interface DeviationFromMeasureSpecification {
  [DC.DID_CALCS_DEVIATE]: YesNo; // does the calculation of the measure deviate from the measure specification
  [DC.DEVIATION_OPTIONS]: string[]; // if YES selected from DID_CALCS_DEVIATE -> which deviations options selected
  [DC.DEVIATIONS]: {
    // the DEVIATION_OPTIONS will map the DEVIATIONS
    [option: string]: {
      [DC.RATE_DEVIATIONS_SELECTED]: Array<
        typeof DC.NUMERATOR | typeof DC.DENOMINATOR | typeof DC.OTHER
      >; // deviations selected for the given option
      [DC.NUMERATOR]: string; // if NUMERATOR selected for RATE_DEVIATIONS_SELECTED -> an explaination
      [DC.DENOMINATOR]: string; // if DENOMINATOR selected for RATE_DEVIATIONS_SELECTED -> an explaination
      [DC.OTHER]: string; // if OTHER selected for RATE_DEVIATIONS_SELECTED -> an explaination
    };
  };
}

export namespace DataDrivenTypes {
  export type OptionalMeasureStrat = OmsNode[];
  export type SingleOmsNode = OmsNode;
  export type PerformanceMeasure = PerformanceMeasureData;
  export type DataSource = Types.DataSourceData;
}
export type DeviationKeys =
  | "numerator"
  | "denominator"
  | "Other"
  | "RateDeviationsSelected";

export type DefaultFormData = Types.AdditionalNotes &
  DidCollect &
  Types.StatusOfData &
  WhyAreYouNotReporting &
  DidReport &
  Types.CombinedRates &
  DateRange &
  DefinitionOfPopulation &
  MeasurementSpecification &
  OtherPerformanceMeasure &
  OptionalMeasureStratification &
  PerformanceMeasure &
  DeviationFromMeasureSpecification &
  DataSource;
