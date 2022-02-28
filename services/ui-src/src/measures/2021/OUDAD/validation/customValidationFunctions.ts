import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "../../globalValidations/validationsLib";

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const dateRange = data["DateRange"];
  const performanceMeasureArray = data["PerformanceMeasure-Rates"];
  let errorArray: any[] = [];

  const performanceMeasureArrayToCheck = performanceMeasureArray?.map(
    (item) => {
      return [item];
    }
  );

  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray = data["DeviationFields"]?.filter((data) => data) || [];

  errorArray = [
    ...errorArray,
    ...ensureBothDatesCompletedInRange(dateRange),
    ...atLeastOneRateComplete(performanceMeasureArrayToCheck, OPM, [
      "age-group",
    ]),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArrayToCheck,
      OPM,
      ["age-group"]
    ),
    ...validateEqualDenominators(performanceMeasureArrayToCheck, ["age-group"]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArrayToCheck, OPM, [
      "age-group",
    ]),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArrayToCheck,
      ["age-group"],
      deviationArray
    ),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
