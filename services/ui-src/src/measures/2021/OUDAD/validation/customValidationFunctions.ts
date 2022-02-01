import { Measure } from "./types";
export const atLeastOneRateComplete = (
  performanceMeasureArray: any,
  ageGroups: string[],
  OPM: any
) => {
  let error = true;
  let errorArray: any[] = [];
  // Check OPM first
  ageGroups.forEach((_ageGroup, i) => {
    if (OPM && OPM[i] && OPM[i].rate) {
      error = false;
    }
  });

  // Then Check regular Performance Measures
  performanceMeasureArray.forEach((performanceObj: any) => {
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
  performanceMeasureArray: any
) => {
  let error = false;
  let errorArray: any[] = [];

  performanceMeasureArray.forEach((performanceObj: any) => {
    console.log(performanceObj);
    if (
      performanceObj &&
      performanceObj.denominator &&
      performanceObj.numerator
    ) {
      if (performanceObj.denominator < performanceObj.numerator) {
        error = true;
      }
    }
  });
  console.log(error);
  if (error) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `Numerators must be less than Denominators for all applicable performance measures`,
    });
  }
  return error ? errorArray : [];
};

export const validateEqualDenominators = (performanceMeasureArray: any) => {
  let error;
  let errorArray: any[] = [];
  let filledInData: any[] = [];

  performanceMeasureArray.forEach((performanceObj: any) => {
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
  const ageGroups = ["Age Group"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray: any = data["PerformanceMeasure-Rates"];
  console.log(performanceMeasureArray);
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, ageGroups, OPM),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray),
    ...validateEqualDenominators(performanceMeasureArray),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
