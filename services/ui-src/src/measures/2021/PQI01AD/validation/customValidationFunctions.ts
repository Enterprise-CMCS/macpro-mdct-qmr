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
    ...atLeastOneRateComplete([performanceMeasureArray], OPM, ["age-groups"]),
    ...validateNumeratorsLessThanDenominators([performanceMeasureArray], OPM, [
      "age-groups",
    ]),
    ...validateNoNonZeroNumOrDenom([performanceMeasureArray], OPM, [
      "age-groups",
    ]),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
