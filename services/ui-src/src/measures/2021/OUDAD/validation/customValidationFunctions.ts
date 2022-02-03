import { Measure } from "./types";
import {
  atLeastOneRateCompleteSingleArray,
  validateNumeratorsLessThanDenominatorsSingleArray,
  validateNoNonZeroNumOrDenomSingleArray,
  validateEqualDenominatorsSingleArray,
} from "../../globalValidations/validationsLib";

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = data["PerformanceMeasure-Rates"];
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateCompleteSingleArray(performanceMeasureArray, OPM),
    ...validateNumeratorsLessThanDenominatorsSingleArray(
      performanceMeasureArray,
      OPM
    ),
    ...validateEqualDenominatorsSingleArray(performanceMeasureArray),
    ...validateNoNonZeroNumOrDenomSingleArray(performanceMeasureArray, OPM),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
