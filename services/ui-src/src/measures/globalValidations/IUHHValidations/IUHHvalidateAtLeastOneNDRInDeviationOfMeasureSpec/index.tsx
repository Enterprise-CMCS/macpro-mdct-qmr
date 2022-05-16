import * as Types from "measures/CommonQuestions/types";

/*
 * If the user indicates that there is a deviation from the measure spec, they must
 * indicate where the deviation is.
 */
export const IUHHvalidateAtLeastOneNDRInDeviationOfMeasureSpec = (
  categoryArray: any,
  deviationArray: Types.DeviationFields[] | any,
  didCalculationsDeviate: boolean
) => {
  let errorArray: FormError[] = [];
  let oneCompletedNDR = false;

  if (didCalculationsDeviate) {
    categoryArray?.forEach((cateogry: any) => {
      oneCompletedNDR = cateogry.some((performanceObj: any) => {
        if (
          performanceObj?.numberOfEnrolleeMonths &&
          performanceObj?.discharges &&
          performanceObj?.dischargesPerThousandMonths &&
          performanceObj?.days &&
          performanceObj?.daysPerThousand &&
          performanceObj?.averageStay
        ) {
          return true;
        }
        return false;
      });
    });

    let deviationArrayLength = 0;
    deviationArray.forEach((itm: string) => {
      if (itm) deviationArrayLength++;
    });

    if (oneCompletedNDR) {
      const atLeastOneDevSection = deviationArrayLength > 0 ? true : false;

      if (!atLeastOneDevSection) {
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
