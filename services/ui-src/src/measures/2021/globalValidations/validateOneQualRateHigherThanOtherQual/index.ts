import * as Types from "measures/2021/CommonQuestions/types";
import * as DC from "dataConstants";
import { OmsValidationCallback, UnifiedValFuncProps as UVFP } from "../types";
import {
  getPerfMeasureRateArray,
  convertOmsDataToRateArray,
} from "../dataDrivenTools";

interface ValProps extends UVFP {
  lowerIndex: number;
  higherIndex: number;
}

const _validation = ({
  categories,
  location,
  qualifiers,
  rateData,
  higherIndex,
  lowerIndex,
  errorMessage,
}: ValProps) => {
  const errorArray: FormError[] = [];

  for (const [i, ratefields] of rateData.entries()) {
    if (
      ratefields?.length >= 2 &&
      parseFloat(ratefields[lowerIndex]?.rate ?? "") >
        parseFloat(ratefields[higherIndex]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: location,
        errorMessage:
          errorMessage ??
          `${qualifiers?.[lowerIndex]} rate must be less than or equal to ${
            qualifiers?.[higherIndex]
          } rate${
            categories?.length && categories[0] !== DC.SINGLE_CATEGORY
              ? ` within ${categories?.[i]}`
              : ""
          }.`,
      });
    }
  }
  return errorArray;
};

/**
 * Validates that one qualifier's rate is higher than the other specified qualifier's rate
 * @note this function returns the oms validation function
 *
 *
 * @param higherIndex which qualifier index should have the higher rate
 * @param lowerIndex which qualifier index should have the lower rate
 * @param explicitErrorMessage gives the measure the ability to explicitly set a measure error message
 */
export const validateOneQualRateHigherThanOtherQualOMS = (
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
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      higherIndex,
      lowerIndex,
      errorMessage: explicitErrorMessage,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
    });
  };
};

/**
 * Validates that one qualifier's rate is higher than the other specified qualifier's rate
 *
 * @param data form data
 * @param performanceMeasureData data driven information
 * @param higherIndex which qualifier index should have the higher rate
 * @param lowerIndex which qualifier index should have the lower rate
 * @param explicitErrorMessage gives the measure the ability to explicitly set a measure error message
 */
export const validateOneQualRateHigherThanOtherQualPM = (
  data: Types.PerformanceMeasure,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure,
  higherIndex = 0,
  lowerIndex = 1,
  explicitErrorMessage?: string
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  return _validation({
    categories: performanceMeasureData.categories,
    qualifiers: performanceMeasureData.qualifiers,
    higherIndex,
    lowerIndex,
    rateData: perfMeasure,
    location: "Performance Measure",
    errorMessage: explicitErrorMessage,
  });
};
