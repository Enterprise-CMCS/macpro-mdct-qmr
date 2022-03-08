import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
import * as PMD from "./data";
import { FormData } from "./types";

const PQI05Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const ageGroups = PMD.qualifiers;
  const dateRange = data["DateRange"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
    ...ensureBothDatesCompletedInRange(dateRange),
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateRequiredRadioButtonForCombinedRates(data),
  ];

  return errorArray;
};

export const validationFunctions = [PQI05Validation];
