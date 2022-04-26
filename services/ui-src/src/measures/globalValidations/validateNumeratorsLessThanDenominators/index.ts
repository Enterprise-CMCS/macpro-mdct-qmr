import { OmsValidationCallback, FormRateField } from "../types";
import { cleanString } from "utils/cleanString";

export const validateNumeratorLessThanDenominatorOMS: OmsValidationCallback = ({
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
        if (temp && temp.denominator && temp.numerator) {
          if (parseFloat(temp.denominator) < parseFloat(temp.numerator)) {
            error.push({
              errorLocation: `Optional Measure Stratification: ${locationDictionary(
                [...label, qual]
              )}`,
              errorMessage:
                "Numerator cannot be greater than the Denominator for NDR sets.",
            });
          }
        }
      }
    }
  }
  return error;
};

// For every performance measure the Numerators must always be less than the denominators
export const validateNumeratorsLessThanDenominatorsPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  ageGroups: string[]
) => {
  let error = false;
  let errorArray: FormError[] = [];
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray?.forEach((performanceMeasure) => {
      if (
        performanceMeasure &&
        performanceMeasure[i] &&
        performanceMeasure[i].denominator &&
        performanceMeasure[i].numerator
      ) {
        if (
          parseFloat(performanceMeasure[i].denominator!) <
          parseFloat(performanceMeasure[i].numerator!)
        ) {
          error = true;
        }
      }
    });
  });
  OPM &&
    OPM.forEach((performanceMeasure: any) => {
      performanceMeasure.rate.forEach((rate: any) => {
        if (parseFloat(rate.numerator) > parseFloat(rate.denominator)) {
          error = true;
        }
      });
    });
  if (error) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `Numerators must be less than Denominators for all applicable performance measures`,
    });
  }
  return error ? errorArray : [];
};
