import * as Types from "measures/2024/shared/CommonQuestions/types";

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
