import { FormData } from "./types";
import * as PMD from "./data";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateOneRateHigherThanOther,
} from "../../globalValidations/validationsLib";

import {
  ensureBothDatesCompletedInRange,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";

const validate3daysLessOrEqualTo30days = (data: FormData) => {
  const perfMeasure = getPerfMeasureRateArray(data, PMD.data);
  const sevenDays = perfMeasure[1];
  const thirtyDays = perfMeasure[0];

  const errorArray: any[] = [];

  if (sevenDays?.length === 2) {
    if (
      parseFloat(sevenDays[0].rate ?? "") > parseFloat(sevenDays[1].rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "The rate value of the 3 Day Postpartum rate must be less than or equal to the Sixty Day Postpartum rate within Long-acting Reversible Method of Contraception (LARC)",
      });
    }
  }
  if (thirtyDays?.length === 2) {
    if (
      parseFloat(thirtyDays[0].rate ?? "") >
      parseFloat(thirtyDays[1].rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "The rate value of the 3 Day Postpartum rate must be less than or equal to the Sixty Day Postpartum rate within Most Effective or Moderately Effective Method of Contraception",
      });
    }
  }

  return errorArray;
};

const CCPADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
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
    ...validateOneRateHigherThanOther(data, PMD.data),
  ];

  return errorArray;
};

export const validationFunctions = [
  CCPADValidation,
  validateRequiredRadioButtonForCombinedRates,
  validate3daysLessOrEqualTo30days,
];
