/* At least one NDR set must be complete (OPM or PM) */
export const IUHHatLeastOneRateComplete = (
  performanceMeasureArray: any,
  OPM: any,
  errorLocation: string = "Performance Measure/Other Performance Measure",
  explicitErrorMessage?: string
) => {
  let error = true;
  let errorArray: any[] = [];

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
      if (qualComplete) {
        error = false;
      }
    }
  }

  if (error) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage:
        explicitErrorMessage ?? "At least one set of fields must be complete.",
    });
  }
  return error ? errorArray : [];
};
