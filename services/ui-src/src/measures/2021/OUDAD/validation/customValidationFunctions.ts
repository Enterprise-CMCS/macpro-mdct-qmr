import { Measure } from "./types";
export const atLeastOneRateComplete = (
  performanceMeasureArray: Measure.Form["PerformanceMeasure-Rates"],
  OPMs: Measure.Form["OtherPerformanceMeasure-Rates"]
) => {
  let error = true;
  let errorArray: any[] = [];
  let OPMError = false;

  // Check OPM first
  OPMs?.forEach((opm) => {
    if (
      opm.description &&
      opm.rate[0]?.denominator &&
      opm.rate[0]?.numerator &&
      opm.rate[0]?.rate
    ) {
      error = false;
    }

    if (error) OPMError = true;
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
      errorLocation: `${OPMError ? "Other " : ""}Performance Measure`,
      errorMessage: `At least one performance measure must be completed`,
    });
  }
  return error ? errorArray : [];
};

export const validateNumeratorsLessThanDenominators = (
  performanceMeasureArray: Measure.Form["PerformanceMeasure-Rates"],
  OPM: Measure.Form["OtherPerformanceMeasure-Rates"]
) => {
  let error = false;
  let errorArray: any[] = [];
  let OPMError = false;

  OPM?.forEach((performanceMeasure: any) => {
    performanceMeasure.rate.forEach((rate: any) => {
      if (parseInt(rate.numerator) > parseInt(rate.denominator)) {
        error = true;
        OPMError = true;
      }
    });
  });

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
      errorLocation: `${OPMError ? "Other " : ""}Performance Measure`,
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

// If a user manually over-rides a rate it must not violate two rules:
// It must be zero if the numerator is zero or
// It Must be greater than zero if the Num and Denom are greater than zero
export const validateNoNonZeroNumOrDenom = (
  performanceMeasureArray: Measure.Form["PerformanceMeasure-Rates"],
  OPM: Measure.Form["OtherPerformanceMeasure-Rates"]
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];
  let OPMError = false;

  performanceMeasureArray?.forEach((performanceMeasure) => {
    if (
      performanceMeasure &&
      performanceMeasure.denominator &&
      performanceMeasure.numerator &&
      performanceMeasure.rate
    ) {
      if (
        parseInt(performanceMeasure.rate) !== 0 &&
        parseInt(performanceMeasure.numerator) === 0
      ) {
        nonZeroRateError = true;
      }
      if (
        parseInt(performanceMeasure.rate) === 0 &&
        parseInt(performanceMeasure.numerator) !== 0 &&
        parseInt(performanceMeasure.denominator) !== 0
      ) {
        zeroRateError = true;
      }
    }
  });

  OPM?.forEach((performanceMeasure: any) => {
    performanceMeasure.rate.forEach((rate: any) => {
      if (parseInt(rate.numerator) === 0 && parseInt(rate.rate) !== 0) {
        nonZeroRateError = true;
        OPMError = true;
      }
      if (
        parseInt(rate.numerator) !== 0 &&
        parseInt(rate.denominator) !== 0 &&
        parseInt(rate.rate) === 0
      ) {
        zeroRateError = true;
        OPMError = true;
      }
    });
  });
  if (nonZeroRateError) {
    errorArray.push({
      errorLocation: `${OPMError ? "Other " : ""}Performance Measure`,
      errorMessage: `Manually entered rate should be 0 if numerator is 0`,
    });
  }
  if (zeroRateError) {
    errorArray.push({
      errorLocation: `${OPMError ? "Other " : ""}Performance Measure`,
      errorMessage: `Manually entered rate should not be 0 if numerator and denominator are not 0`,
    });
  }
  return zeroRateError || nonZeroRateError ? errorArray : [];
};

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const performanceMeasureArray = data["PerformanceMeasure-Rates"];
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

export const validationFunctions = [OUDValidation];
