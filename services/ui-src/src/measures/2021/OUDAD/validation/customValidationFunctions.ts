import { Measure } from "./types";
export const atLeastOneRateComplete = (
  performanceMeasureArray: Measure.Form["PerformanceMeasure-Rates"],
  OPMs: Measure.Form["OtherPerformanceMeasure-Rates"]
) => {
  let error = true;
  let errorArray: any[] = [];
  // Check OPM first
  OPMs?.forEach((opm) => {
    console.log(opm);
    if (
      opm.description &&
      opm.rate[0]?.denominator &&
      opm.rate[0]?.numerator &&
      opm.rate[0]?.rate
    ) {
      error = false;
    }
  });

  // Then Check regular Performance Measures
  performanceMeasureArray?.forEach((performanceObj) => {
    if (
      performanceObj &&
      performanceObj.denominator &&
      performanceObj.numerator
    ) {
      error = false;
    }
  });
  if (error) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `At least one performance measure must be completed`,
    });
  }
  return error ? errorArray : [];
};

export const validateNumeratorsLessThanDenominators = (
  performanceMeasureArray: Measure.Form["PerformanceMeasure-Rates"]
) => {
  let error = false;
  let errorArray: any[] = [];

  performanceMeasureArray?.forEach((performanceObj) => {
    if (
      performanceObj &&
      performanceObj.denominator &&
      performanceObj.numerator
    ) {
      if (
        parseFloat(performanceObj.denominator) <
        parseFloat(performanceObj.numerator)
      ) {
        error = true;
      }
    }
  });
  if (error) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `Numerators must be less than Denominators for all applicable performance measures`,
    });
  }
  return error ? errorArray : [];
};

export const validateEqualDenominators = (
  performanceMeasureArray: Measure.Form["PerformanceMeasure-Rates"]
) => {
  let error;
  let errorArray: any[] = [];
  let filledInData: any[] = [];

  performanceMeasureArray?.forEach((performanceObj) => {
    if (performanceObj && performanceObj.denominator) {
      filledInData.push(performanceObj);
    }
  });
  if (filledInData.length > 1) {
    const firstDenominator = filledInData[0].denominator;
    let denominatorsNotEqual = false;
    filledInData.forEach((_filledInDataObj, index) => {
      if (filledInData[index].denominator !== firstDenominator) {
        denominatorsNotEqual = true;
      }
    });
    if (denominatorsNotEqual) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Denominators must be the same for all performance measures",
      };

      errorArray.push(error);
    }
  }
  return error ? errorArray : [];
};
const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = data["PerformanceMeasure-Rates"];
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray),
    ...validateEqualDenominators(performanceMeasureArray),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
