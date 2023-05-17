import * as Types from "measures/2023/shared/CommonQuestions/types";

// When a user inputs data in multiple NDR sets in a performance measure
// Then the user must complete at least one NDR set in the Deviation of measure specification.
export const validateAtLeastOneDeviationFieldFilled = (
  deviationReason: Types.DeviationField | any,
  didCalculationsDeviate: boolean,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let reasonGiven: boolean = false;


  // if calculationsDeviate & deviationReason isn't empty string, return reasonGien true?

  if (didCalculationsDeviate) {
          if (!!deviationReason)
           {
            reasonGiven = true;
            return deviationReason;
         
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
