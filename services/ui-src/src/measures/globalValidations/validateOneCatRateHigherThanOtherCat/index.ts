import * as Types from "measures/CommonQuestions/types";

import { cleanString } from "utils/cleanString";
import { OmsValidationCallback } from "../types";
import { getPerfMeasureRateArray } from "../dataDrivenTools";

// @example
// OMS is setup to be qualifier -> categories -> rate component
// can expect them to be in the same order as the data driven type
// export const exampleValidator: OmsValidationCallback = ({categories,label,locationDictionary,qualifiers,rateData}) => {
//   const error: FormError[] = [];
//   for (const qual of qualifiers.map((s) => cleanString(s))) {
//     for (const cat of categories.map((s) => cleanString(s))) {
//       console.log('qual', qual)
//       console.log('cat', cat)
//     }}
//     return error
// }
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
      const rateArr: Types.RateFields[] = [];
      for (const cat of categories.map((s) => cleanString(s))) {
        if (rateData.rates?.[cleanQual]?.[cat]) {
          const temp = rateData.rates[cleanQual][cat][0];
          if (temp && temp.rate) {
            rateArr.push(temp);
          }
        }
      }
      if (!isRateLessThanOther(rateArr)) {
        errors.push({
          errorLocation: `Optional Measure Stratification: ${locationDictionary(
            label
          )} - ${qual}`,
          errorMessage: `${categories[lowerIndex]} Rate should not be higher than ${categories[higherIndex]} Rates.`,
        });
      }
    }
    return errors;
  };
};

export const validateOneCatRateHigherThanOtherCatPM = (
  data: Types.DefaultFormData,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure,
  lowerIndex = 1,
  higherIndex = 0
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  const lowerRate = perfMeasure[lowerIndex];
  const higherRate = perfMeasure[higherIndex];
  let error;
  const errorArray: FormError[] = [];

  if (lowerRate && higherRate) {
    lowerRate.forEach((_lowerRateObj, index) => {
      if (
        lowerRate[index] &&
        higherRate[index] &&
        parseFloat(lowerRate[index]?.rate ?? "") >
          parseFloat(higherRate[index]?.rate ?? "")
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `${performanceMeasureData.categories?.[lowerIndex]} Rate should not be higher than ${performanceMeasureData.categories?.[higherIndex]} Rate for ${performanceMeasureData.qualifiers?.[index]} Rates`,
        };

        errorArray.push(error);
      }
    });
  }

  return errorArray;
};
