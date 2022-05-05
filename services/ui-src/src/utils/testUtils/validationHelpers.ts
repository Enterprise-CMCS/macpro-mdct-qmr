import * as DC from "dataConstants";
import { cleanString } from "utils/cleanString";
import {
  RateFields,
  OmsNodes as OMS,
  DataDrivenTypes as DDT,
  PerformanceMeasure,
} from "measures/CommonQuestions/types";

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
export const lowerRate: RateFields = {
  numerator: "1",
  denominator: "4",
  rate: "25.0",
  label: "Lower Rate Label",
};
export const higherRate: RateFields = {
  numerator: "3",
  denominator: "4",
  rate: "75.0",
  label: "Higher Rate Label",
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
 * Helper function to prep oms validation test data  by slotting test data in qualifier order
 *
 * @param categories should always at least contain "singleCategory"
 * @param qualifiers a non-negotiable string array
 * @param testData what test data to place in the qualifier location in rate data
 *
 * @note testData MUST be the same length as chosen qualifiers
 */
export const generateOmsQualifierRateData = (
  categories: string[],
  qualifiers: string[],
  testData: RateFields[]
) => {
  if (testData.length !== qualifiers.length) {
    console.error("Mismatch in test data length");
    return {};
  }
  const rateData: OMS.OmsRateFields = {};
  const cats = categories.length ? categories : [DC.SINGLE_CATEGORY];
  rateData.options = qualifiers;

  for (const [i, q] of qualifiers.map((q) => cleanString(q)).entries()) {
    for (const c of cats.map((c) => cleanString(c))) {
      rateData.rates ??= {};
      rateData.rates[q] ??= {};
      rateData.rates[q][c] = [testData[i]];
    }
  }

  return rateData;
};

/**
 * Helper function to prep oms validation test data  by slotting test data in category order
 *
 * @param categories should be longer than just singleCategory
 * @param qualifiers a non-negotiable string array
 * @param testData what test data to place in the category location in rate data
 *
 * @note testData MUST be the same length as chosen categories
 */
export const generateOmsCategoryRateData = (
  categories: string[],
  qualifiers: string[],
  testData: RateFields[]
) => {
  if (testData.length !== categories.length) {
    console.error("Mismatch in test data length");
    return {};
  }

  const rateData: OMS.OmsRateFields = {};
  for (const [i, c] of categories.map((c) => cleanString(c)).entries()) {
    for (const q of qualifiers.map((q) => cleanString(q))) {
      rateData.rates ??= {};
      rateData.rates[q] ??= {};
      rateData.rates[q][c] = [testData[i]];
    }
  }

  return rateData;
};

/**
 * Helper function to prep pm validation test data by slotting test data in qualifier order
 *
 * @param pmd needs to contain the qualifiers and categories
 * @param testData an array of rate objects that is the same length as qualifiers
 */
export const generatePmQualifierRateData = (
  pmd: DDT.PerformanceMeasure,
  testData: RateFields[]
) => {
  if (testData.length !== pmd?.qualifiers?.length) {
    console.error("Mismatch in test data length");
    return {};
  }
  const rateData: PerformanceMeasure = { PerformanceMeasure: { rates: {} } };
  const cats = pmd.categories?.length ? pmd.categories : [DC.SINGLE_CATEGORY];

  for (let i = 0; i < pmd.qualifiers.length; i++) {
    for (const c of cats?.map((c) => cleanString(c)) ?? []) {
      rateData.PerformanceMeasure!.rates![c] ??= [];
      rateData?.PerformanceMeasure?.rates?.[c]?.push(testData[i]);
    }
  }

  return rateData;
};

/**
 * Helper function to prep pm validation test data by slotting test data in category order
 *
 * @param pmd needs to contain the categories and qualifiers
 * @param testData an array of rate objects that is the same length as categories
 */
export const generatePmCategoryRateData = (
  pmd: DDT.PerformanceMeasure,
  testData: RateFields[]
) => {
  if (testData.length !== pmd?.categories?.length) {
    console.error("Mismatch in test data length");
    return {};
  }

  const rateData: PerformanceMeasure = { PerformanceMeasure: { rates: {} } };

  for (const [i, c] of pmd.categories.map((c) => cleanString(c)).entries()) {
    pmd.qualifiers?.forEach(() => {
      rateData.PerformanceMeasure!.rates![c] ??= [];
      rateData?.PerformanceMeasure?.rates?.[c]?.push(testData[i]);
    });
  }

  return rateData;
};

/**
 * Dummy location dictionary function for testing utility
 */
export const locationDictionary = (s: string[]) => {
  return s[0];
};
