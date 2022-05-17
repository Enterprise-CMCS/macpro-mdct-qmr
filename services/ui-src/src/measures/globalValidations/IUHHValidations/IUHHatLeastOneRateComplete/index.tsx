/* At least one NDR set must be complete (OPM or PM) */
export const IUHHatLeastOneRateComplete = (
  categoryArray: any,
  OPM: any,
  ageGroups: string[],
  errorLocation: string = "Performance Measure/Other Performance Measure"
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
  if (error) {
    categoryArray?.forEach((cateogry: any) => {
      if (cateogry.length === ageGroups.length) {
        const oneCompletedNDR = cateogry.some((performanceObj: any) => {
          if (
            performanceObj?.numberOfEnrolleeMonths &&
            performanceObj?.discharges &&
            performanceObj?.dischargesPerThousandMonths &&
            performanceObj?.days &&
            performanceObj?.daysPerThousand &&
            performanceObj?.averageStay
          ) {
            return true;
          }
          return false;
        });

        if (oneCompletedNDR) error = false;
      }
    });
  }

  if (error) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: "All data fields must be completed.",
    });
  }
  return error ? errorArray : [];
};
