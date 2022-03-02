import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
} from "../../globalValidations/validationsLib";
import { PMD } from "../questions/data";
import { Measure } from "./types";
const PQI01Validation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-groups"]),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM, [
      "age-groups",
    ]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, [
      "age-groups",
    ]),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
