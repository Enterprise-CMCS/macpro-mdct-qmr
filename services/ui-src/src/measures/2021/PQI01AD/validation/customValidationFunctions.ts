import {
  atLeastOneRateCompleteSingleArray,
  validateNumeratorsLessThanDenominatorsSingleArray,
  validateNoNonZeroNumOrDenomSingleArray,
  validateEqualDenominatorsSingleArray,
} from "../../globalValidations/validationsLib";
const PQI01Validation = (data: any) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = data["PerformanceMeasure-AgeRates"];
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateCompleteSingleArray(performanceMeasureArray, OPM),
    ...validateNumeratorsLessThanDenominatorsSingleArray(
      performanceMeasureArray,
      OPM
    ),
    ...validateEqualDenominatorsSingleArray(performanceMeasureArray),
    ...validateNoNonZeroNumOrDenomSingleArray(performanceMeasureArray, OPM),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
