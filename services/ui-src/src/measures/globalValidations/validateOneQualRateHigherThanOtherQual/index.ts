import * as Types from "../../CommonQuestions/types";
import { getPerfMeasureRateArray } from "../dataDrivenTools";

// Built specifically for CCP-AD and CCP-CH
export const validateOneQualRateHigherThanOtherQualPM = (
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
