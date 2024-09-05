import * as Types from "shared/types";

export const validateAtLeastOneDataSource = (
  data: Types.DataSource,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  if (
    (!data.DataSource || data.DataSource.length === 0) &&
    !data?.["DataSource-CAHPS-Version"]
  ) {
    errorArray.push({
      errorLocation: "Data Source",
      errorMessage:
        errorMessage ?? "You must select at least one Data Source option",
    });
  }

  return errorArray;
};
