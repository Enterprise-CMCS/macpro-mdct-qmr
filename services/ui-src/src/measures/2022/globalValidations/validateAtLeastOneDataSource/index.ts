import * as Types from "measures/2022/CommonQuestions/types";

export const validateAtLeastOneDataSource = (
  data: Types.DataSource,
  explicitErrorMessage?: string
) => {
  const errorArray: FormError[] = [];
  if (!data.DataSource || data.DataSource.length === 0) {
    errorArray.push({
      errorLocation: "Data Source",
      errorMessage:
        explicitErrorMessage ??
        "You must select at least one Data Source option",
    });
  }

  return errorArray;
};
