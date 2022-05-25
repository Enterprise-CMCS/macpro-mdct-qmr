import * as Types from "measures/CommonQuestions/types";

/**
 * Given a PerformanceMeasure or OtherPerformanceMeasure object, return true if any of the rates are
 * completed
 * @param data - The data object that is being edited.
 * @returns a boolean value.
 */
export const areSomeRatesCompleted = (data: any, measureId: string = "") => {
  let ratesExist = false;
  const rateExists = (rate: Types.RateFields) =>
    rate?.rate || (rate?.denominator && rate?.numerator);
  const PCRrateExists = (rate: any) => rate?.value;
  const IUHHRateExists = (rate: any) => {
    return rate?.fields.some((field: any) => {
      return field?.value;
    });
  };

  const performanceMeasureRates = data.PerformanceMeasure?.rates;
  if (performanceMeasureRates) {
    for (const option in performanceMeasureRates) {
      // Ugly, but PCR-XX are the only measures that break this check.
      // If you are thinking about adding another hard-coded value here, consider refactoring this function.
      if (
        (measureId === "PCR-AD" || measureId === "PCR-HH") &&
        performanceMeasureRates?.[option]?.some(PCRrateExists)
      ) {
        ratesExist = true;
      } else if (
        measureId === "IU-HH" &&
        performanceMeasureRates?.[option]?.some(IUHHRateExists)
      ) {
        ratesExist = true;
      } else if (performanceMeasureRates?.[option]?.some(rateExists)) {
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
