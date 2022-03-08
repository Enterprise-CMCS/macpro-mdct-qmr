import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateReasonForNotReporting,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";

const OUDValidation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data["DateRange"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-group"]),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM, [
      "age-group",
    ]),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...validateEqualDenominators(performanceMeasureArray, ["age-group"]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ["age-group"]),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
