import * as Types from "../../CommonQuestions/types";

import { cleanString } from "utils/cleanString";
import { OmsValidationCallback } from "../types";
import { getPerfMeasureRateArray } from "../dataDrivenTools";

export const validateOneQualRateHigherThanOtherQualOMS = (
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
      const compareValue = rateArr[higherIndex].rate ?? "";
      return (
        parseFloat(rateArr[lowerIndex].rate ?? "") <= parseFloat(compareValue)
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
        errorMessage: `${qualifiers[lowerIndex]} rate should not be higher than ${qualifiers[higherIndex]} rates.`,
      });
    }
    return errors;
  };
};

// Built specifically for CCP-AD and CCP-CH
export const validateOneQualRateHigherThanOtherQualPM = (
  data: Types.DefaultFormData,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure,
  higherIndex = 0,
  lowerIndex = 1
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  const sevenDays = perfMeasure[higherIndex];
  const thirtyDays = perfMeasure[lowerIndex];

  const errorArray: any[] = [];

  if (sevenDays?.length === 2) {
    if (
      parseFloat(sevenDays[lowerIndex]?.rate ?? "") >
      parseFloat(sevenDays[higherIndex]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `${
          performanceMeasureData.qualifiers?.[lowerIndex]
        } rate must be less than or equal to ${
          performanceMeasureData.qualifiers?.[higherIndex]
        } rate${
          performanceMeasureData.categories?.length
            ? ` within ${performanceMeasureData.categories?.[higherIndex]}`
            : ""
        }.`,
      });
    }
  }
  if (thirtyDays?.length === 2) {
    if (
      parseFloat(thirtyDays[lowerIndex]?.rate ?? "") >
      parseFloat(thirtyDays[higherIndex]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `${
          performanceMeasureData.qualifiers?.[lowerIndex]
        } rate must be less than or equal to ${
          performanceMeasureData.qualifiers?.[higherIndex]
        } rate${
          performanceMeasureData.categories?.length
            ? ` within ${performanceMeasureData.categories?.[lowerIndex]}`
            : ""
        }.`,
      });
    }
  }

  return errorArray;
};
