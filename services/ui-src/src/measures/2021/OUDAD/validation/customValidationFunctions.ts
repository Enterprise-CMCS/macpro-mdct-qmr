import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = data["PerformanceMeasure-Rates"];
  let errorArray: any[] = [];

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
    ...validateRequiredRadioButtonForCombinedRates(data),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
