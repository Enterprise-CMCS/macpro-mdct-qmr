import * as Types from "measures/CommonQuestions/types";

/**
 * Given a PerformanceMeasure or OtherPerformanceMeasure object, return true if any of the rates are
 * completed
 * @param data - The data object that is being edited.
 * @returns a boolean value.
 */
export const areSomeRatesCompleted = (data: any) => {
  let ratesExist = false;
  const rateExists = (rate: Types.RateFields) =>
    rate?.rate || (rate?.denominator && rate?.numerator);

  const performanceMeasureRates = data.PerformanceMeasure?.rates;
  if (performanceMeasureRates) {
    for (const option in performanceMeasureRates) {
      if (performanceMeasureRates?.[option]?.some(rateExists)) {
        ratesExist = true;
      }
    }
  }

  const otherPerformanceMeasureRates = data["OtherPerformanceMeasure-Rates"];
  if (otherPerformanceMeasureRates) {
    otherPerformanceMeasureRates?.forEach((rate: any) => {
      if (rate.description) ratesExist = true;
      if (rate.rate?.some(rateExists)) ratesExist = true;
    });
  }

  return ratesExist;
};
