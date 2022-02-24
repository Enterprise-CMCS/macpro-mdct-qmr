import { Measure } from "../validation/types";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
} from "../../globalValidations/validationsLib";

const CCWADValidation = (data: Measure.Form) => {
  const ageGroups = ["21 to 44"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"],
    data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"],
  ];

  let errorArray: any[] = [];
  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
  ];

  return errorArray;
};

export const validationFunctions = [CCWADValidation];
