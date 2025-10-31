import * as Types from "shared/types";
import * as DC from "dataConstants";
import {
  OmsValidationCallback,
  UnifiedValFuncProps as UVFP,
} from "../../types/TypeValidations";
import {
  getPerfMeasureRateArray,
  convertOmsDataToRateArray,
} from "../dataDrivenTools";

type ErrorMessageFunc = (
  lowQual: string,
  highQual: string,
  singleCategoryCheck: boolean,
  category: string
) => string;

interface ValProps extends UVFP {
  lowerIndex: number;
  higherIndex: number;
  errorMessageFunc?: ErrorMessageFunc;
}

const validateOneQualRateHigherThanOtherQualErrorMessage: ErrorMessageFunc = (
  lowQual: string,
  highQual: string,
  notSingleCategory: boolean,
  category: string
) => {
  return `${lowQual} rate must be less than or equal to ${highQual} rate${
    notSingleCategory ? ` within ${category}` : ""
  }.`;
};

const _validation = ({
  categories,
  location,
  qualifiers,
  rateData,
  higherIndex,
  lowerIndex,
  errorMessageFunc = validateOneQualRateHigherThanOtherQualErrorMessage,
}: ValProps) => {
  const errorArray: FormError[] = [];

  for (const [i, ratefields] of rateData.entries()) {
    if (
      ratefields?.length >= 2 &&
      parseFloat(ratefields[lowerIndex]?.rate ?? "") >
        parseFloat(ratefields[higherIndex]?.rate ?? "")
    ) {
      const notSingleCategory: boolean =
        categories?.length &&
        categories[0].label !== DC.SINGLE_CATEGORY &&
        categories[0].label
          ? true
          : false;
      errorArray.push({
        errorLocation: location,
        errorMessage: errorMessageFunc(
          qualifiers?.[lowerIndex]?.label!,
          qualifiers?.[higherIndex]?.label!,
          notSingleCategory,
          categories?.[i]?.label!
        ),
      });
    }
  }
  return errorArray;
};

/*
 * Validates that one qualifier's rate is higher than the other specified qualifier's rate
 * @note this function returns the oms validation function
 *
 *
 * @param higherIndex which qualifier index should have the higher rate
 * @param lowerIndex which qualifier index should have the lower rate
 */
export const validateOneQualRateHigherThanOtherQualOMS = (
  higherIndex = 0,
  lowerIndex = 1,
  errorMessageFunc?: ErrorMessageFunc
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
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      errorMessageFunc,
    });
  };
};

/*
 * Validates that one qualifier's rate is higher than the other specified qualifier's rate
 *
 * @param data form data
 * @param performanceMeasureData data driven information
 * @param higherIndex which qualifier index should have the higher rate
 * @param lowerIndex which qualifier index should have the lower rate
 */
export const validateOneQualRateHigherThanOtherQualPM = (
  data: Types.PerformanceMeasure,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure,
  higherIndex = 0,
  lowerIndex = 1,
  errorMessageFunc?: ErrorMessageFunc
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  return _validation({
    categories: performanceMeasureData.categories,
    qualifiers: performanceMeasureData.qualifiers,
    higherIndex,
    lowerIndex,
    rateData: perfMeasure,
    location: "Performance Measure",
    errorMessageFunc,
  });
};
