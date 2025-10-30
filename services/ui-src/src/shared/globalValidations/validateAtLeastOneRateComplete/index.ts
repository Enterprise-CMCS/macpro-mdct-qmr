import { LabelData } from "utils";
import { FormRateField } from "../../types/TypeValidations";
import { validatePartialRateCompletionPM } from "../validatePartialRateCompletion";
import { FormError } from "error";

export const validateAtLeastOneRateComplete = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  qualifiers: LabelData[],
  categories?: LabelData[],
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  let rateCompletionError = true;
  // Check OPM first
  OPM &&
    OPM.forEach((measure: any) => {
      if (measure.rate && measure.rate[0] && measure.rate[0].rate) {
        rateCompletionError = false;
      }
    });

  // Then Check regular Performance Measures
  qualifiers.forEach((_ageGroup, i) => {
    performanceMeasureArray?.forEach((_performanceObj, index) => {
      if (
        performanceMeasureArray[index] &&
        performanceMeasureArray[index][i] &&
        performanceMeasureArray[index][i].denominator &&
        performanceMeasureArray[index][i].rate &&
        performanceMeasureArray[index][i].numerator
      ) {
        rateCompletionError = false;
      }
    });
  });
  if (rateCompletionError) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage:
        errorMessage ??
        `At least one Performance Measure Numerator, Denominator, and Rate must be completed`,
    });
  }
  return [
    ...errorArray,
    ...validatePartialRateCompletionPM(
      performanceMeasureArray,
      OPM,
      qualifiers,
      categories
    ),
  ];
};
