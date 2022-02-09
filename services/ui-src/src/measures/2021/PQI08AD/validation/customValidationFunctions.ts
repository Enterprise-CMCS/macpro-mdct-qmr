import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
} from "../../globalValidations/validationsLib";
const PQI01Validation = (data: any) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = data["PerformanceMeasure-AgeRates"];
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete([performanceMeasureArray], OPM, ["age-group"]),
    ...validateNumeratorsLessThanDenominators([performanceMeasureArray], OPM, [
      "age-group",
    ]),
    ...validateNoNonZeroNumOrDenom([performanceMeasureArray], OPM, [
      "age-group",
    ]),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
