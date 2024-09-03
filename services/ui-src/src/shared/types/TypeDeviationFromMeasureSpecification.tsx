import * as DC from "dataConstants";

type YesNo = typeof DC.YES | typeof DC.NO;

export type DeviationKeys =
  | "numerator"
  | "denominator"
  | "Other"
  | "RateDeviationsSelected";

export interface DeviationFromMeasureSpecification {
  [DC.DID_CALCS_DEVIATE]: YesNo; // does the calculation of the measure deviate from the measure specification
  [DC.DEVIATION_OPTIONS]: string[]; // if YES selected from DID_CALCS_DEVIATE -> which deviations options selected
}

//used for 2021 & 2022 measures
export interface DeviationFromMeasureSpecificationCheckboxes
  extends DeviationFromMeasureSpecification {
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

//use for years >= 2023, they just want a simple textfield to capture the deviation compare to before
export interface DeviationFromMeasureSpecificationTextField
  extends DeviationFromMeasureSpecification {
  [DC.DEVIATION_REASON]: string;
}
