import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateReasonForNotReporting
} from "../../globalValidations/validationsLib";

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = data["PerformanceMeasure-Rates"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  let errorArray: any[] = [];
  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  const performanceMeasureArrayToCheck = performanceMeasureArray?.map(
    (item) => {
      return [item];
    }
  );

  errorArray = [
    ...errorArray,
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
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
