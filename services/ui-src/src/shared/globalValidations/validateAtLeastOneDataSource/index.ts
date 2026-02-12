import * as Types from "shared/types";
import { featuresByYear } from "utils/featuresByYear";

export const validateAtLeastOneDataSource = (
  data: Types.DataSource,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];

  const dataSourceLabel = featuresByYear.useDataCollectionMethod
    ? "Data Collection Method"
    : "Data Source";

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
