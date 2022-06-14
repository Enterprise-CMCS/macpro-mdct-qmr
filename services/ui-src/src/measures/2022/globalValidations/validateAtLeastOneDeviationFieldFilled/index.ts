import * as Types from "measures/2022/CommonQuestions/types";
import { FormRateField } from "../types";

// When a user inputs data in multiple NDR sets in a performance measure
// Then the user must complete at least one NDR set in the Deviation of measure specification.
export const validateAtLeastOneDeviationFieldFilled = (
  performanceMeasureArray: FormRateField[][],
  ageGroups: string[],
  deviationArray: Types.DeviationFields[] | any,
  didCalculationsDeviate: boolean,
  explicitErrorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let ndrCount = 0;
  if (didCalculationsDeviate) {
    ageGroups.forEach((_ageGroup, i) => {
      performanceMeasureArray?.forEach((_performanceObj, index) => {
        if (
          performanceMeasureArray[index] &&
          performanceMeasureArray[index][i] &&
          performanceMeasureArray[index][i].denominator &&
          performanceMeasureArray[index][i].numerator &&
          performanceMeasureArray[index][i].rate
        ) {
          ndrCount++;
        }
      });
    });

    if (ndrCount > 0) {
      const atLeastOneDevNDR = deviationArray.some((deviationNDR: any) => {
        if (
          deviationNDR?.denominator ||
          deviationNDR?.numerator ||
          deviationNDR?.other
        ) {
          return true;
        }
        return false;
      });

      if (!atLeastOneDevNDR) {
        errorArray.push({
          errorLocation: "Deviations from Measure Specifications",
          errorMessage:
            explicitErrorMessage ??
            "At least one item must be selected and completed (Numerator, Denominator, or Other)",
        });
      }
    }
  }
  return errorArray;
};
