import { Measure } from "../validation/types";
import {
  atLeastOneRateComplete,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
} from "../../globalValidations/validationsLib";

import { ensureBothDatesCompletedInRange } from "../../globalValidations/validationsLib";
const CCPADValidation = (data: Measure.Form) => {
  const ageGroups = ["3 days postpartem", "60 days postpartem"];
  const sixtyDaysIndex = 1;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-longActingContraception"],
    data["PerformanceMeasure-AgeRates-effectiveContraception"],
  ];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];

  let errorArray: any[] = [];
  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  let sameDenominatorError = [
    ...validateEqualDenominators(
      [
        data["PerformanceMeasure-AgeRates-longActingContraception"],
        data["PerformanceMeasure-AgeRates-effectiveContraception"],
      ],
      ageGroups
    ),
  ];
  sameDenominatorError =
    sameDenominatorError.length > 0 ? [...sameDenominatorError] : [];
  const dateRange = data["DateRange"];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      sixtyDaysIndex,
      DefinitionOfDenominator
    ),
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
