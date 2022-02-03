const PQI01Validation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = data["PerformanceMeasure-AgeRates"];
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM),
    ...validateEqualDenominators(performanceMeasureArray),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
