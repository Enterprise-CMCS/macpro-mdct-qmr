import * as DC from "dataConstants";
import * as Types from "measures/CommonQuestions/types";
import { OmsValidationCallback, FormRateField } from "../types";
import { cleanString } from "utils/cleanString";

export const validateRateZeroOMS: OmsValidationCallback = ({
  categories,
  qualifiers,
  rateData,
  label,
  locationDictionary,
  dataSource,
}) => {
  const hybridData = dataSource?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );
  const error: FormError[] = [];
  for (const qual of qualifiers.map((s) => cleanString(s))) {
    for (const cat of categories.map((s) => cleanString(s))) {
      if (rateData.rates?.[qual]?.[cat]) {
        const temp = rateData.rates[qual][cat][0];
        if (temp && temp.denominator && temp.numerator && temp.rate) {
          if (
            parseFloat(temp.numerator) === 0 &&
            parseFloat(temp.denominator) > 0 &&
            parseFloat(temp.rate) !== 0 &&
            !hybridData
          ) {
            error.push({
              errorLocation: `Optional Measure Stratification: ${locationDictionary(
                label
              )}`,
              errorMessage:
                "Manually entered rate should be 0 if numerator is 0",
            });
          }
        }
      }
    }
  }
  return error;
};

export const validateRateNotZeroOMS: OmsValidationCallback = ({
  categories,
  qualifiers,
  rateData,
  label,
  locationDictionary,
}) => {
  const error: FormError[] = [];
  for (const qual of qualifiers.map((s) => cleanString(s))) {
    for (const cat of categories.map((s) => cleanString(s))) {
      if (rateData.rates?.[qual]?.[cat]) {
        const temp = rateData.rates[qual][cat][0];
        if (temp && temp.denominator && temp.numerator && temp.rate) {
          if (
            parseFloat(temp.numerator) > 0 &&
            parseFloat(temp.denominator) > 0 &&
            parseFloat(temp.rate) === 0
          ) {
            error.push({
              errorLocation: `Optional Measure Stratification: ${locationDictionary(
                label
              )}`,
              errorMessage:
                "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.",
            });
          }
        }
      }
    }
  }
  return error;
};

// If a user manually over-rides a rate it must not violate two rules:
// It must be zero if the numerator is zero or
// It Must be greater than zero if the Num and Denom are greater than zero
export const validateNoNonZeroNumOrDenomPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  ageGroups: string[],
  data: Types.DefaultFormData
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];
  const hybridData = data[DC.DATA_SOURCE]?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray?.forEach((performanceMeasure) => {
      if (
        performanceMeasure &&
        performanceMeasure[i] &&
        performanceMeasure[i].denominator &&
        performanceMeasure[i].numerator &&
        performanceMeasure[i].rate
      ) {
        if (
          parseFloat(performanceMeasure[i].rate!) !== 0 &&
          parseFloat(performanceMeasure[i].numerator!) === 0
        ) {
          nonZeroRateError = true;
        }
        if (
          parseFloat(performanceMeasure[i].rate!) === 0 &&
          parseFloat(performanceMeasure[i].numerator!) !== 0 &&
          parseFloat(performanceMeasure[i].denominator!) !== 0
        ) {
          zeroRateError = true;
        }
      }
    });
  });

  OPM &&
    OPM.forEach((performanceMeasure: any) => {
      performanceMeasure.rate.forEach((rate: any) => {
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
  if (nonZeroRateError && !hybridData) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `Manually entered rate should be 0 if numerator is 0`,
    });
  }
  if (zeroRateError) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.`,
    });
  }
  return zeroRateError || nonZeroRateError ? errorArray : [];
};
