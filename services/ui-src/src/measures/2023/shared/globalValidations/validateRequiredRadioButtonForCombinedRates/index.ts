import * as DC from "dataConstants";
import * as Types from "shared/types";

export const validateRequiredRadioButtonForCombinedRates = (
  data: Types.CombinedRates,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];

  if (data.CombinedRates && data.CombinedRates === DC.YES) {
    if (!data["CombinedRates-CombinedRates"]) {
      errorArray.push({
        errorLocation: "Combined Rate(s)",
        errorMessage:
          errorMessage ??
          "You must select at least one option for Combined Rate(s) Details if Yes is selected.",
      });
    }
  }

  return errorArray;
};
