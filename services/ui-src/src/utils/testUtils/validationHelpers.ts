import { RateFields, OmsNodes as OMS } from "measures/CommonQuestions/types";

export const partialRate: RateFields = {
  numerator: "5",
};
export const simpleRate: RateFields = {
  numerator: "1",
  denominator: "2",
  rate: "50.0",
};
export const doubleRate: RateFields = {
  numerator: "2",
  denominator: "4",
  rate: "50.0",
  label: "Double Test Label",
};
export const incorrectNumeratorRate: RateFields = {
  numerator: "3",
  denominator: "4",
  rate: "50.0",
  label: "Numerator Test Label",
};
export const incorrectDenominatorRate: RateFields = {
  numerator: "2",
  denominator: "5",
  rate: "50.0",
  label: "Denominator Test Label",
};
export const emptyRate: RateFields = {
  numerator: "",
  denominator: "",
  rate: "",
  label: "Empty Test Label",
};

/**
 * Helper function to prep test data
 *
 * @param categories should always at least contain "singleCategory"
 * @param qualifiers a non-negotiable string array
 * @param testData what test data to place in the qualifier location in rate data
 *
 * @note testData MUST be the same length as chosen qualifiers
 */
export const generateRateData = (
  categories: string[],
  qualifiers: string[],
  testData: RateFields[]
) => {
  if (testData.length !== qualifiers.length) {
    console.error("Mismatch in test data length");
    return {};
  }
  const rateData: OMS.OmsRateFields = {};
  rateData.options = qualifiers;

  for (const [i, q] of qualifiers.entries()) {
    for (const c of categories) {
      rateData.rates ??= {};
      rateData.rates[q] ??= {};
      rateData.rates[q][c] = [testData[i]];
    }
  }

  return rateData;
};
