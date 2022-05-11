import * as Types from "measures/CommonQuestions/types";

export const validateAtLeastOneDataSource = (data: Types.DataSource) => {
  const errorArray: FormError[] = [];
  if (!data.DataSource || data.DataSource.length === 0) {
    errorArray.push({
      errorLocation: "Data Source",
      errorMessage: "You must select at least one Data Source option",
    });
  }

  return errorArray;
};
