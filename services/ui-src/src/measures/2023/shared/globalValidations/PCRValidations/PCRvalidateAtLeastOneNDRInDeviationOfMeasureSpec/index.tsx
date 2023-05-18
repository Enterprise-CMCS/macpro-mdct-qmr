import { DEVIATION_REASON } from "dataConstants";
import * as Types from "measures/2023/shared/CommonQuestions/types";

interface NDRforumla {
  numerator: number;
  denominator: number;
  rateIndex: number;
}

/*
 * If the user indicates that there is a deviation from the measure spec, they must
 * indicate where the deviation is.
 */
export const PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec = (
  performanceMeasureArray: any,
  ndrFormulas: NDRforumla[],
  didCalculationsDeviate: boolean
) => {
  let errorArray: FormError[] = [];
  let ndrCount = 0;

  if (didCalculationsDeviate) {
    performanceMeasureArray?.forEach((performanceMeasure: any) => {
      if (performanceMeasure && performanceMeasure.length > 0) {
        ndrFormulas.forEach((ndr: NDRforumla) => {
          if (
            performanceMeasure[ndr.numerator].value &&
            performanceMeasure[ndr.denominator].value &&
            performanceMeasure[ndr.rateIndex].value
          ) {
            ndrCount++;
          }
        });
      }
    });


    if (ndrCount > 0) {
      const deviationReason = DEVIATION_REASON ?? false;
      if (!deviationReason) {
        errorArray.push({
          errorLocation: "Deviations from Measure Specifications",
          errorMessage:
          "Deviation(s) must be explained"
        });
      }
    }
  }

  return errorArray;
};
