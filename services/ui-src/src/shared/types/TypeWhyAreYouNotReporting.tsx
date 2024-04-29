import * as DC from "dataConstants";

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
