import { validatePartialRateCompletionPM } from "../../validatePartialRateCompletion";

/* At least one NDR set must be complete (OPM or PM) */
export const ComplexAtLeastOneRateComplete = (
  performanceMeasureArray: any,
  OPM: any,
  errorLocation: string = "Performance Measure/Other Performance Measure"
) => {
  let error = true;
  let partialError = false;
  let errorArray: FormError[] = [];

  // Check OPM first
  OPM &&
    OPM.forEach((measure: any) => {
      if (measure?.rate && measure?.rate?.[0]?.rate) {
        error = false;
      }
    });

  // Check regular Performance Measures if cannot validate OPM
  // For each Performance Measure
  //    Check that the performance measure has a field representation for each age groups
  //    Check that each field has a "value" and it is not an empty string
  //    For a complete measure the sum of the booleans will equal the length of the age groups
  for (const category of performanceMeasureArray) {
    for (const qualifier of category) {
      const qualComplete = qualifier.fields.every(
        (field: { value: string; label: string }) => {
          return field.value !== undefined && field.value !== "";
        }
      );
      if (
        !qualComplete &&
        qualifier.fields.some((field: { value?: string; label?: string }) => {
          return !!(field?.value !== undefined && field?.value !== "");
        })
      ) {
        partialError = true;
      }
      if (qualComplete) {
        error = false;
      }
    }
  }

  if (partialError) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: `Should not have partially filled data sets.`,
    });
  }

  if (error) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: "At least one set of fields must be complete.",
    });
  }

  if (OPM) {
    errorArray.push(...validatePartialRateCompletionPM([], OPM, []));
  }

  return errorArray;
};
