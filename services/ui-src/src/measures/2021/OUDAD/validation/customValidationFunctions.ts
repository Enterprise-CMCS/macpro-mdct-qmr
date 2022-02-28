import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
} from "../../globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import { PMD } from "../questions/data";

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data) ?? [];
  let errorArray: any[] = [];

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-group"]),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM, [
      "age-group",
    ]),
    ...validateEqualDenominators(performanceMeasureArray, ["age-group"]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ["age-group"]),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
