import { Measure } from "../validation/types";
import { PMD } from "../questions/data";
import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
} from "../../globalValidations/validationsLib";

import { ensureBothDatesCompletedInRange } from "../../globalValidations/validationsLib";
const CCPADValidation = (data: Measure.Form) => {
  const ageGroups = ["3 days postpartem", "60 days postpartem"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  let errorArray: any[] = [];
  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  let sameDenominatorError = [
    ...validateEqualDenominators(performanceMeasureArray, ageGroups),
  ];
  sameDenominatorError =
    sameDenominatorError.length > 0 ? [...sameDenominatorError] : [];
  const dateRange = data["DateRange"];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...sameDenominatorError,
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...ensureBothDatesCompletedInRange(dateRange),
  ];

  return errorArray;
};

export const validationFunctions = [CCPADValidation];
