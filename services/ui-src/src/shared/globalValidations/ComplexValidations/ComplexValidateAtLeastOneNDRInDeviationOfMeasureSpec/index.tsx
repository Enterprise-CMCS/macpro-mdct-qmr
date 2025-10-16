import * as Types from "shared/types";
import { ndrFormula } from "types";

/*
 * If the user indicates that there is a deviation from the measure spec, they must
 * indicate where the deviation is.
 */
export const ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec = (
  performanceMeasureArray: any,
  ndrFormulas: ndrFormula[],
  deviationArray: Types.DeviationFields[] | any,
  didCalculationsDeviate: boolean
) => {
  let errorArray: FormError[] = [];
  let oneRateComplete = false;

  if (didCalculationsDeviate) {
    for (const category of performanceMeasureArray) {
      if (oneRateComplete) break;
      for (const qualifier of category) {
        if (oneRateComplete) break;
        for (const formula of ndrFormulas) {
          const numerator = qualifier.fields[formula.numerator]?.value;
          const denominator = qualifier.fields[formula.denominator]?.value;
          const rate = qualifier.fields[formula.rateIndex]?.value;

          if (![numerator, denominator, rate].includes("")) {
            oneRateComplete = true;
            break;
          }
        }
      }
    }

    if (oneRateComplete) {
      const atLeastOneDevNDR = deviationArray?.some((deviationNDR: any) => {
        return (
          deviationNDR?.denominator ||
          deviationNDR?.numerator ||
          deviationNDR?.other
        );
      });

      if (!atLeastOneDevNDR) {
        errorArray.push({
          errorLocation: "Deviations from Measure Specifications",
          errorMessage:
            "At least one item must be selected and completed (Numerator, Denominator, or Other)",
        });
      }
    }
  }

  return errorArray;
};
