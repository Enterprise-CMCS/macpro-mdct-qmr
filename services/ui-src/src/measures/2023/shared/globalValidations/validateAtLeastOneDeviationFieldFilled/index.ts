import { FormRateField } from "measures/2021/globalValidations/types";
import * as Types from "measures/2023/shared/CommonQuestions/types";

// When a user inputs data in multiple NDR sets in a performance measure
// Then the user must complete at least one NDR set in the Deviation of measure specification.
export const validateAtLeastOneDeviationFieldFilled = (
  performanceMeasureArray: FormRateField[][],
  didCalculationsDeviate: boolean,
  deviationReason: string,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let reasonGiven: boolean = false;
  console.log(deviationReason, 'deviation reason');


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
