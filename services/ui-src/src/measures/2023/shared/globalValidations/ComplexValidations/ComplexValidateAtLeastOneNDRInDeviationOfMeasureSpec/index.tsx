/*
 * If the user indicates that there is a deviation from the measure spec, they 
 * must explain the deviation(s)
 */
export const ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec = (
  didCalculationsDeviate: boolean,
  deviationReason: string,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let reasonGiven: boolean = false;

  if (didCalculationsDeviate) {
    if (!!deviationReason) {
      reasonGiven = true;
    }

    if (!reasonGiven) {
      errorArray.push({
        errorLocation: "Deviations from Measure Specifications",
        errorMessage: errorMessage ?? "Deviation(s) must be explained",
      });
    }
  }
  return errorArray;
};
