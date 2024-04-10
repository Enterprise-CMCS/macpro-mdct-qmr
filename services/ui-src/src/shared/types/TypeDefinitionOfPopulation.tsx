import * as DC from "dataConstants";

type YesNo = typeof DC.YES | typeof DC.NO;

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
