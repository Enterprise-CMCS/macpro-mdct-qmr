import * as Types from "../CommonQuestions/types";
import { getPerfMeasureRateArray } from "./dataDrivenTools";

export const validateOneRateHigherThanOther = (
  data: Types.DefaultFormData,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  const lowerRate = perfMeasure[1];
  const higherRate = perfMeasure[0];
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
          errorMessage: `${performanceMeasureData.categories?.[1]} Rate should not be higher than ${performanceMeasureData.categories?.[0]} Rate for ${performanceMeasureData.qualifiers?.[index]} Rates`,
        };

        errorArray.push(error);
      }
    });
  }

  return errorArray;
};

// Built specifically for CCP-AD and CCP-CH
export const validate3daysLessOrEqualTo30days = (
  data: Types.DefaultFormData,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  const sevenDays = perfMeasure[1];
  const thirtyDays = perfMeasure[0];

  const errorArray: any[] = [];

  if (sevenDays?.length === 2) {
    if (
      parseFloat(sevenDays[0]?.rate ?? "") >
      parseFloat(sevenDays[1]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `The rate value of the ${performanceMeasureData.qualifiers?.[0]} must be less than or equal to the ${performanceMeasureData.qualifiers?.[1]} within ${performanceMeasureData.categories?.[1]}.`,
      });
    }
  }
  if (thirtyDays?.length === 2) {
    if (
      parseFloat(thirtyDays[0]?.rate ?? "") >
      parseFloat(thirtyDays[1]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `The rate value of the ${performanceMeasureData.qualifiers?.[0]} must be less than or equal to the ${performanceMeasureData.qualifiers?.[1]} within ${performanceMeasureData.categories?.[0]}.`,
      });
    }
  }

  return errorArray;
};
