import * as Types from "../../CommonQuestions/types";

import { OmsValidationCallback, UnifiedValFuncProps as UVFP } from "../types";
import {
  convertOmsDataToRateArray,
  getPerfMeasureRateArray,
} from "../dataDrivenTools";

interface ValProps extends UVFP {
  lowerIndex: number;
  higherIndex: number;
}

const _validation = ({
  location,
  qualifiers,
  rateData,
  higherIndex,
  lowerIndex,
  errorMessage,
}: ValProps) => {
  const errorArray: FormError[] = [];

  for (const ratefields of rateData) {
    const highDenom = ratefields[higherIndex];
    const lowerDenom = ratefields[lowerIndex];

    if (
      highDenom &&
      lowerDenom &&
      highDenom.denominator &&
      lowerDenom.denominator
    ) {
      if (
        parseFloat(lowerDenom.denominator) > parseFloat(highDenom.denominator)
      ) {
        errorArray.push({
          errorLocation: location,
          errorMessage:
            errorMessage ??
            `${qualifiers?.[lowerIndex]} denominator must be less than or equal to ${qualifiers?.[higherIndex]} denominator.`,
        });
      }
    }
  }

  return errorArray;
};

/**
 * Validates that one qualifier's denominator is higher than the other specified qualifier's denominator
 * @note this function returns the oms validation function
 *
 *
 * @param higherIndex which qualifier index should have the higher denominator
 * @param lowerIndex which qualifier index should have the lower denominator
 */
export const validateOneQualDenomHigherThanOtherDenomOMS = (
  higherIndex = 0,
  lowerIndex = 1,
  explicitErrorMessage?: string
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
    return _validation({
      categories,
      qualifiers,
      higherIndex,
      lowerIndex,
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      errorMessage: explicitErrorMessage,
    });
  };
};

/**
 * Validates that one qualifier's denominator is higher than the other specified qualifier's denominator
 *
 * @param data form data
 * @param pmData data driven information
 * @param higherIndex which qualifier index should have the higher denominator
 * @param lowerIndex which qualifier index should have the lower denominator
 */
export const validateOneQualDenomHigherThanOtherDenomPM = (
  data: Types.PerformanceMeasure,
  pmData: Types.DataDrivenTypes.PerformanceMeasure,
  higherIndex = 0,
  lowerIndex = 1,
  explicitErrorMessage?: string
) => {
  return _validation({
    higherIndex,
    location: "Performance Measure",
    lowerIndex,
    rateData: getPerfMeasureRateArray(data, pmData),
    categories: pmData.categories,
    qualifiers: pmData.qualifiers,
    errorMessage: explicitErrorMessage,
  });
};
