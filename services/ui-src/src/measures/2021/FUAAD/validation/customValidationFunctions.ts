import { Measure } from "../validation/types";
import {
  atLeastOneRateComplete,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
} from "../../globalValidations/validationsLib";

const FUAADValidation = (data: Measure.Form) => {
  const ageGroups = ["18 to 64", "65 and older"];
  const sixtyDaysIndex = 1;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-7Days"],
    data["PerformanceMeasure-AgeRates-30Days"],
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
        data["PerformanceMeasure-AgeRates-7Days"],
        data["PerformanceMeasure-AgeRates-30Days"],
      ],
      ageGroups
    ),
  ];
  sameDenominatorError =
    sameDenominatorError.length > 0 ? [sameDenominatorError[0]] : [];

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
  ];

  return errorArray;
};

export const validationFunctions = [FUAADValidation];

