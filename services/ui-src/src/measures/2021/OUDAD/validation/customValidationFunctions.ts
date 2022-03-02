import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "../../globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import { PMD } from "../questions/data";

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data["DateRange"];
  let errorArray: any[] = [];

  const performanceMeasureArrayToCheck = performanceMeasureArray;
  // ?.map(
  //   (item) => {
  //     return [item];
  //   }
  // );

  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray: any = [];
  // data["DeviationFields"]?.filter((data) => data) ||
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-group"]),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM, [
      "age-group",
    ]),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArrayToCheck,
      ["age-group"],
      deviationArray
    ),
    ...validateEqualDenominators(performanceMeasureArray, ["age-group"]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ["age-group"]),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
