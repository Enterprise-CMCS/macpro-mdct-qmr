import * as Types from "../../CommonQuestions/types";

import { cleanString } from "utils/cleanString";
import { OmsValidationCallback } from "../types";

export const validateOneQualDenomHigherThanOtherDenomOMS = (
  higherIndex = 0,
  lowerIndex = 1
): OmsValidationCallback => {
  return ({
    rateData,
    categories,
    qualifiers,
    label,
    locationDictionary,
    isOPM,
  }) => {
    if (isOPM) return [];

    const rateArr: Types.RateFields[] = [];

    const errors: FormError[] = [];

    const isRateLessThanOther = (rateArr: Types.RateFields[]) => {
      if (rateArr.length !== 2) return true;

      const compareValue = rateArr[higherIndex].denominator ?? "";

      return (
        parseFloat(rateArr[lowerIndex].denominator ?? "") <=
        parseFloat(compareValue)
      );
    };

    for (const qual of qualifiers) {
      const cleanQual = cleanString(qual);

      for (const cat of categories.map((s) => cleanString(s))) {
        if (rateData.rates?.[cleanQual]?.[cat]) {
          const temp = rateData.rates[cleanQual][cat][0];

          if (temp && temp.rate) {
            rateArr.push(temp);
          }
        }
      }
    }

    if (!isRateLessThanOther(rateArr)) {
      errors.push({
        errorLocation: `Optional Measure Stratification: ${locationDictionary(
          label
        )}`,

        errorMessage: `${qualifiers[lowerIndex]} denominator must be less than or equal to ${qualifiers[higherIndex]} denominator.`,
      });
    }

    return errors;
  };
};

export const validateOneQualDenomHigherThanOtherDenomPM = (
  data: Types.DefaultFormData,
  pmData: Types.DataDrivenTypes.PerformanceMeasure,
  higherIndex = 0,
  lowerIndex = 1
) => {
  const errorArray: FormError[] = [];
  const categories = pmData.categories?.length
    ? pmData.categories
    : ["singleCategory"];

  for (const cat of categories.map((s) => cleanString(s))) {
    const higherRate = data.PerformanceMeasure?.rates?.[cat]?.[higherIndex];
    const lowerRate = data.PerformanceMeasure?.rates?.[cat]?.[lowerIndex];

    if (
      higherRate &&
      higherRate.denominator &&
      lowerRate &&
      lowerRate.denominator
    ) {
      if (
        parseFloat(lowerRate.denominator) > parseFloat(higherRate.denominator)
      ) {
        errorArray.push({
          errorLocation: "Performance Measure",
          errorMessage: `${pmData.qualifiers?.[lowerIndex]} denominator must be less than or equal to ${pmData.qualifiers?.[higherIndex]} denominator.`,
        });
      }
    }
  }

  return errorArray;
};
