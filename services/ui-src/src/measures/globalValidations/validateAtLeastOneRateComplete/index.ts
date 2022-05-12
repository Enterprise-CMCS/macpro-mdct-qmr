import { FormRateField } from "../types";

export const validateAtLeastOneRateComplete = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  ageGroups: string[]
) => {
  let error = true;
  let errorArray: FormError[] = [];
  // Check OPM first
  OPM &&
    OPM.forEach((measure: any) => {
      if (measure.rate && measure.rate[0] && measure.rate[0].rate) {
        error = false;
      }
    });

  // Then Check regular Performance Measures
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray?.forEach((_performanceObj, index) => {
      if (
        performanceMeasureArray[index] &&
        performanceMeasureArray[index][i] &&
        performanceMeasureArray[index][i].denominator &&
        performanceMeasureArray[index][i].numerator
      ) {
        error = false;
      }
    });
  });
  if (error) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `At least one Performance Measure Numerator, Denominator, and Rate must be completed`,
    });
  }
  return error ? errorArray : [];
};
