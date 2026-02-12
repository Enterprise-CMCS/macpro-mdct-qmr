import * as Types from "shared/types";

export const validateAtLeastOneDataSource = (
  data: Types.DataSource,
  errorMessage?: string,
  year?: string
) => {
  const errorArray: FormError[] = [];

  const dataSourceLabel =
    year && parseInt(year) >= 2026 ? "Data Collection Method" : "Data Source";

  const defaultErrorMessage = `You must select at least one ${dataSourceLabel} option`;

  if (
    (!data.DataSource || data.DataSource.length === 0) &&
    !data?.["DataSource-CAHPS-Version"]
  ) {
    errorArray.push({
      errorLocation: dataSourceLabel,
      errorMessage: errorMessage ?? defaultErrorMessage,
    });
  }

  return errorArray;
};
