import { FormError } from "error";
import * as Types from "shared/types";

export const validateDateRangeRadioButtonCompletion = (
  data: Types.DateRange,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  if (!data["MeasurementPeriodAdhereToCoreSetSpecification"]) {
    errorArray.push({
      errorLocation: "Date Range",
      errorMessage: errorMessage ?? "Date Range answer must be selected",
    });
  }

  return errorArray;
};
