import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
} from "../../globalValidations/validationsLib";

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = data["PerformanceMeasure-Rates"];
  let errorArray: any[] = [];

  const arrayToTestEqualDenominators = performanceMeasureArray.map((item) => {
    return [item];
  });

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete([performanceMeasureArray], OPM, ["age-group"]),
    ...validateNumeratorsLessThanDenominators([performanceMeasureArray], OPM, [
      "age-group",
    ]),
    ...validateEqualDenominators(arrayToTestEqualDenominators, ["age-group"]),
    ...validateNoNonZeroNumOrDenom([performanceMeasureArray], OPM, [
      "age-group",
    ]),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
