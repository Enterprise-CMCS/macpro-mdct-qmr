import * as Types from "shared/types";
import { FormRateField } from "shared/types/TypeValidations";

/*
 * When a user inputs data in multiple NDR sets in a performance measure
 * Then the user must complete at least one NDR set in the Deviation of measure specification.
 */
export const validateAtLeastOneDeviationFieldFilled = (
  performanceMeasureArray: FormRateField[][],
  deviationArray: Types.DeviationFields[] | any,
  didCalculationsDeviate: boolean,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let ndrCount = 0;
  let atLeastOneDevNDR: boolean = false;
  let isCCWAD: boolean = false;

  if (didCalculationsDeviate) {
    performanceMeasureArray.flatMap((rates) => {
      const filled = rates.filter(
        (set) => set && set.denominator && set.numerator && set.rate
      );
      ndrCount += filled.length;

      if (rates.find((rate) => rate.label === "All Women Ages 21 to 44"))
        isCCWAD = true;
    });

    if (ndrCount > 0) {
      deviationArray.forEach((deviationNDR: any) => {
        // CCW-AD validation
        let selectedOptions;
        if (isCCWAD) {
          selectedOptions = deviationNDR?.SelectedOptions[0];
          if (
            deviationNDR[selectedOptions].denominator ||
            deviationNDR[selectedOptions].numerator ||
            deviationNDR[selectedOptions].other
          ) {
            atLeastOneDevNDR = true;
          } else {
            atLeastOneDevNDR = false;
          }
        } else {
          if (
            deviationNDR?.denominator ||
            deviationNDR?.numerator ||
            deviationNDR?.other
          ) {
            atLeastOneDevNDR = true;
          } else {
            atLeastOneDevNDR = false;
          }
        }
        return atLeastOneDevNDR;
      });

      if (!atLeastOneDevNDR) {
        errorArray.push({
          errorLocation: "Deviations from Measure Specifications",
          errorMessage:
            errorMessage ??
            "At least one item must be selected and completed (Numerator, Denominator, or Other)",
        });
      }
    }
  }
  return errorArray;
};
