import * as Types from "measures/CommonQuestions/types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateReasonForNotReporting,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import * as PMD from "./data";

const MSCADValidation = (data: Types.DefaultFormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const dateRange = data["DateRange"];

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
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...sameDenominatorError,
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateRequiredRadioButtonForCombinedRates(data),
  ];

  return errorArray;
};

export const validationFunctions = [MSCADValidation];
