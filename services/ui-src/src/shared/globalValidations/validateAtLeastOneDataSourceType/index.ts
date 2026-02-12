import * as Types from "shared/types";
import { DataSource } from "../../../types";
import { featuresByYear } from "utils/featuresByYear";

const OPTIONAL_DATA_SOURCES = new Set([DataSource.EHR, DataSource.ECDS]);

export const validateAtLeastOneDataSourceType = (
  data: Types.DataSource,
  errorMessage?: string,
  year?: string
) => {
  const errorArray: FormError[] = [];
  const dataSources = data.DataSourceSelections;

  const dataSourceLabel = featuresByYear.useDataCollectionMethod
    ? "Data Collection Method"
    : "Data Source";

  if (dataSources) {
    //find selected data sources with unfilled explanation boxes, which are not optional
    const unfilledDataSources = Object.keys(dataSources).filter(
      (key) =>
        "description" in dataSources[key] &&
        !dataSources[key]["description"] &&
        !OPTIONAL_DATA_SOURCES.has(key as DataSource)
    );
    errorArray.push(
      ...unfilledDataSources.map((key) => {
        const lookupKey = key.split("-")?.[1] ?? key;
        const label = Types.getDataSourceDisplayName(lookupKey, year);
        return {
          errorLocation: dataSourceLabel,
          errorMessage:
            errorMessage ??
            `Please describe the ${label}${
              !label.includes("Source") && !label.includes("Method")
                ? " Source"
                : ""
            }`,
        };
      })
    );

    //find selected data sources where the child checkbox is unselected
    const unselectedDataSources = Object.keys(dataSources).filter(
      (key) =>
        ("selected" in dataSources[key] && !dataSources[key]["selected"]) ||
        dataSources[key]["selected"]?.length === 0
    );
    errorArray.push(
      ...unselectedDataSources.map((_key) => ({
        errorLocation: dataSourceLabel,
        errorMessage:
          errorMessage ?? `You must select a ${dataSourceLabel.toLowerCase()}`,
      }))
    );
  }
  return errorArray;
};
