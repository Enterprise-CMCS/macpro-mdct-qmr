import * as Types from "measures/2023/shared/CommonQuestions/types";

/*
 * If the user indicates that there is a deviation from the measure spec, they must
 * indicate where the deviation is.
 */
export const ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec = (
  deviationReason: Types.DeviationField[] | any,

  didCalculationsDeviate: boolean
) => {
  let errorArray: FormError[] = [];

  if (didCalculationsDeviate) {
    if (!!deviationReason) {
      return deviationReason;
    } else {
      errorArray.push({
        errorLocation: "Deviations from Measure Specifications",
        errorMessage:
          "Deviation(s) must be explained",
      });
    }
  }

  return errorArray;
};
