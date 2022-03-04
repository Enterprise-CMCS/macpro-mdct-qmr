import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
} from "../../globalValidations/validationsLib";
import * as PMD from "./data";
import { FormData } from "./types";

const PQI15Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
  ];

  return errorArray;
};

export const validationFunctions = [PQI15Validation];
