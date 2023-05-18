// When a user indicates that there is a deviation, they must add an explanation in the textarea.
export const validateAtLeastOneDeviationFieldFilled = (
  didCalculationsDeviate: boolean,
  deviationReason: string,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let reasonGiven: boolean = false;

  if (didCalculationsDeviate) {
          if (!!deviationReason)
           {
            reasonGiven = true;
          };

      if (!reasonGiven) {
        errorArray.push({
          errorLocation: "Deviations from Measure Specifications",
          errorMessage:
            errorMessage ??
            "Deviation(s) must be explained",
        });
      }
  }
  return errorArray;
};
