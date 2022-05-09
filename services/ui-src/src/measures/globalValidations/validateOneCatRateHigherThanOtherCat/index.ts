import * as Types from "measures/CommonQuestions/types";

import { OmsValidationCallback, UnifiedValFuncProps as UVFP } from "../types";
import {
  getPerfMeasureRateArray,
  convertOmsDataToRateArray,
} from "../dataDrivenTools";

interface ValProps extends UVFP {
  lowerIndex: number;
  higherIndex: number;
  messageFunc: (highCat: string, lowCat: string, qualifier: string) => string;
  locationFunc?: (qualifier: string) => string;
}

const _validation = ({
  categories,
  location,
  qualifiers,
  rateData,
  higherIndex,
  lowerIndex,
  locationFunc,
  messageFunc,
}: ValProps) => {
  const errorArray: FormError[] = [];
  const lowerRate = rateData[lowerIndex];
  const higherRate = rateData[higherIndex];
  for (let i = 0; i < lowerRate?.length; i++) {
    const lrate = lowerRate?.[i]?.rate;
    const hrate = higherRate?.[i]?.rate;

    if (lrate && hrate) {
      if (parseFloat(lrate) > parseFloat(hrate)) {
        errorArray.push({
          errorLocation: locationFunc ? locationFunc(qualifiers![i]) : location,
          errorMessage: messageFunc(
            categories![higherIndex],
            categories![lowerIndex],
            qualifiers![i]
          ),
        });
      }
    }
  }
  return errorArray;
};

/**
 * Validates that one category's rate is higher than the other specified category's rate
 * @note this function returns the oms validation function
 *
 *
 * @param higherIndex which category index should have the higher rate
 * @param lowerIndex which category index should have the lower rate
 */
export const validateOneCatRateHigherThanOtherCatOMS = (
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
    return _validation({
      categories,
      qualifiers,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      higherIndex,
      lowerIndex,
      locationFunc: (q) =>
        `Optional Measure Stratification: ${locationDictionary(label)} - ${q}`,
      location: "Optional Measure Stratification",
      messageFunc: (hc, lc) =>
        `${lc} Rate should not be higher than ${hc} Rates.`,
    });
  };
};

/**
 * Validates that one categoyr's rate is higher than the other specified categoyr's rate
 *
 * @param data form data
 * @param performanceMeasureData data driven information
 * @param higherIndex which category index should have the higher rate
 * @param lowerIndex which category index should have the lower rate
 */
export const validateOneCatRateHigherThanOtherCatPM = (
  data: Types.PerformanceMeasure,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure,
  lowerIndex = 1,
  higherIndex = 0
) => {
  return _validation({
    categories: performanceMeasureData.categories,
    qualifiers: performanceMeasureData.qualifiers,
    rateData: getPerfMeasureRateArray(data, performanceMeasureData),
    higherIndex,
    location: "Performance Measure",
    lowerIndex,
    messageFunc: (hc, lc, q) =>
      `${lc} Rate should not be higher than ${hc} Rate for ${q} Rates.`,
  });
};
