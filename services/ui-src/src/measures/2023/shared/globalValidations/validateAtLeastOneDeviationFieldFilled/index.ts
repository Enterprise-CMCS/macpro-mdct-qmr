import * as Types from "measures/2023/shared/CommonQuestions/types";
import { FormRateField } from "../types";

// When a user inputs data in multiple NDR sets in a performance measure
// Then the user must complete at least one NDR set in the Deviation of measure specification.
export const validateAtLeastOneDeviationFieldFilled = (
  didCalculationsDeviate: boolean,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let reasonGiven: boolean = false;

  const deviationReason = GV.getDeviationReason(
    data.DeviationReason,
  );

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
            "Textbox must not be empty",
        });
      }
  }
  return errorArray;
};
