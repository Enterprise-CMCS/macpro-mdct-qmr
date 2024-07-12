interface NDRforumla {
  numerator: number;
  denominator: number;
  rateIndex: number;
}

export const ComplexNoNonZeroNumOrDenomOMS = (
  rateData: any,
  ndrFormulas: NDRforumla[],
  errorLocation: string
) => {
  let errorArray: any[] = [];
  for (const key in rateData) {
    if (key === "OPM") {
      for (const opmLabel in rateData[key]) {
        errorArray.push(
          ...ComplexNoNonZeroNumOrDenom(
            [],
            [{ rate: rateData[key][opmLabel] }],
            ndrFormulas,
            `${errorLocation} - ${opmLabel}`
          )
        );
      }
    } else {
      for (const category in rateData[key]) {
        errorArray.push(
          ...ComplexNoNonZeroNumOrDenom(
            [rateData[key][category]],
            false,
            ndrFormulas,
            `${errorLocation} - ${key} - ${category}`
          )
        );
      }
    }
  }

  return errorArray;
};

/* Validation for manually entered rates */
export const ComplexNoNonZeroNumOrDenom = (
  performanceMeasureArray: any,
  OPM: any,
  ndrFormulas: NDRforumla[],
  errorLocation: string = "Performance Measure/Other Performance Measure"
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];

  if (!OPM) {
    for (const category of performanceMeasureArray) {
      if (category && category.length > 0) {
        for (const qualifier of category) {
          for (const formula of ndrFormulas) {
            const numerator = qualifier.fields[formula.numerator]?.value;
            const denominator = qualifier.fields[formula.denominator]?.value;
            const rate = qualifier.fields[formula.rateIndex]?.value;

            if (numerator && denominator && rate) {
              if (parseFloat(numerator) === 0 && parseFloat(rate) !== 0)
                nonZeroRateError = true;
              if (
                parseFloat(rate) === 0 &&
                parseFloat(numerator) !== 0 &&
                parseFloat(denominator) !== 0
              )
                zeroRateError = true;
            }
          }
        }
      }
    }
  }
  OPM &&
    OPM.forEach((performanceMeasure: any) => {
      performanceMeasure.rate?.forEach((rate: any) => {
        if (parseFloat(rate.numerator) === 0 && parseFloat(rate.rate) !== 0) {
          nonZeroRateError = true;
        }

        if (
          parseFloat(rate.numerator) !== 0 &&
          parseFloat(rate.denominator) !== 0 &&
          parseFloat(rate.rate) === 0
        ) {
          zeroRateError = true;
        }
      });
    });
  if (nonZeroRateError) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: `Manually entered rate should be 0 if numerator is 0`,
    });
  }
  if (zeroRateError) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: `Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.`,
    });
  }
  return zeroRateError || nonZeroRateError ? errorArray : [];
};
