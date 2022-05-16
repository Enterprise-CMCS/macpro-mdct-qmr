/* Validation for manually entered rates */
export const IUHHnoNonZeroNumOrDenom = (
  categoryArray: any,
  OPM: any,
  errorLocation: string = "Performance Measure/Other Performance Measure"
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];

  categoryArray?.forEach((cateogry: any) => {
    cateogry.forEach((performanceObj: any) => {
      if (
        (performanceObj?.discharges === 0 &&
          performanceObj?.dischargesPerThousandMonths !== 0) ||
        (performanceObj?.days === 0 && performanceObj?.daysPerThousand !== 0)
      ) {
        nonZeroRateError = true;
      }

      if (
        performanceObj?.numberOfEnrolleeMonths !== 0 &&
        ((performanceObj?.discharges !== 0 &&
          performanceObj?.dischargesPerThousandMonths === 0) ||
          (performanceObj?.days !== 0 && performanceObj?.daysPerThousand === 0))
      ) {
        zeroRateError = true;
      }
    });
  });

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
