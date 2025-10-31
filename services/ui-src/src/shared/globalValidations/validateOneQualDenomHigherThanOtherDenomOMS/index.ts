import * as Types from "shared/types";

import {
  OmsValidationCallback,
  UnifiedValFuncProps as UVFP,
} from "../../types/TypeValidations";
import {
  convertOmsDataToRateArray,
  getPerfMeasureRateArray,
} from "../dataDrivenTools";
import { FormError } from "error";

type ErrorMessageFunc = (lowerQual: string, higherQual: string) => string;

interface ValProps extends UVFP {
  lowerIndex: number;
  higherIndex: number;
  errorMessageFunc?: ErrorMessageFunc;
}

const validateOneQualDenomHigherThanOtherDenomErrorMessage = (
  lowerQual: string,
  higherQual: string
) => {
  return `${lowerQual} denominator must be less than or equal to ${higherQual} denominator.`;
};

const _validation = ({
  location,
  qualifiers,
  rateData,
  higherIndex,
  lowerIndex,
  errorMessageFunc = validateOneQualDenomHigherThanOtherDenomErrorMessage,
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
          errorMessage: errorMessageFunc(
            qualifiers?.[lowerIndex]?.label!,
            qualifiers?.[higherIndex]?.label!
          ),
        });
      }
    }
  }

  return errorArray;
};

/*
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
      higherIndex,
      lowerIndex,
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      errorMessageFunc,
    });
  };
};

/*
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
  errorMessageFunc?: ErrorMessageFunc
) => {
  return _validation({
    higherIndex,
    location: "Performance Measure",
    lowerIndex,
    rateData: getPerfMeasureRateArray(data, pmData),
    categories: pmData.categories,
    qualifiers: pmData.qualifiers,
    errorMessageFunc,
  });
};
