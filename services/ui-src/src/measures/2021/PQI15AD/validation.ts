import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
} from "measures/globalValidations/omsValidationsLib";
import {
  getPerfMeasureRateArray,
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  omsLocationDictionary,
} from "measures/globalValidations";
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
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(OMSData(true)),
      validationCallbacks: [validateDenominatorGreaterThanNumerator],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [PQI15Validation];
