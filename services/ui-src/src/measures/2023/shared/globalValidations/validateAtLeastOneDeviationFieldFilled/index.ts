import * as Types from "measures/2023/shared/CommonQuestions/types";

// When a user inputs data in multiple NDR sets in a performance measure
// Then the user must complete at least one NDR set in the Deviation of measure specification.
export const validateAtLeastOneDeviationFieldFilled = (
  deviationArray: Types.DeviationFields[] | any,
  didCalculationsDeviate: boolean,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let reasonGiven: boolean = false;


  // if calculationsDeviate & deviationReason isn't empty string, return reasonGien true?

  if (didCalculationsDeviate) {
      deviationArray.forEach((deviationNDR: any) => {
          if (
            deviationNDR.denominator ||
            deviationNDR.numerator ||
            deviationNDR.other
          ) {
            return reasonGiven = true;
          } else {
           return reasonGiven = false;
          }
      });

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
