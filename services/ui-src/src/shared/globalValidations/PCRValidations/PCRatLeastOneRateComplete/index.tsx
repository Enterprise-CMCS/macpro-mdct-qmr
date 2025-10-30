import { LabelData } from "utils";
import { validatePartialRateCompletionPM } from "../../validatePartialRateCompletion";
import { FormError } from "error";

/* At least one NDR set must be complete (OPM or PM) */
export const PCRatLeastOneRateComplete = (
  performanceMeasureArray: any,
  OPM: any,
  ageGroups: LabelData[],
  errorLocation: string = "Performance Measure/Other Performance Measure",
  omsFlag = false
) => {
  let error = true;
  let errorArray: FormError[] = [];

  // Check OPM first
  if (OPM) {
    error = !OPM.some(
      (measure: any) => !!(measure?.rate && measure?.rate?.[0]?.rate)
    );
  }

  // Check regular Performance Measures if cannot validate OPM
  // For each Performance Measure
  //    Check that the performance measure has a field representation for each age groups
  //    Check that each field has a "value" and it is not an empty string
  //    For a complete measure the sum of the booleans will equal the length of the age groups
  if (error) {
    performanceMeasureArray?.forEach((_performanceObj: any) => {
      if (_performanceObj.length === ageGroups.length) {
        const values = _performanceObj.map((obj: any) => {
          if (obj?.value && obj.value) return true;
          return false;
        });
        const sum = values.reduce((x: any, y: any) => x + y);
        if (sum === ageGroups.length) error = false;
      }
    });
  }

  if (error) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: "All data fields must be completed.",
    });
  }

  if (OPM && !omsFlag) {
    errorArray.push(...validatePartialRateCompletionPM([], OPM, ageGroups));
  }

  return errorArray;
};
