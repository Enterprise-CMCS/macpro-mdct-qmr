import * as DC from "dataConstants";
import * as Types from "measures/2021/CommonQuestions/types";

export const validateRequiredRadioButtonForCombinedRates = (
  data: Types.CombinedRates
) => {
  const errorArray: FormError[] = [];

  if (data.CombinedRates && data.CombinedRates === DC.YES) {
    if (!data["CombinedRates-CombinedRates"]) {
      errorArray.push({
        errorLocation: "Combined Rate(s)",
        errorMessage:
          "You must select at least one option for Combined Rate(s) Details if Yes is selected.",
      });
    }
  }

  return errorArray;
};
