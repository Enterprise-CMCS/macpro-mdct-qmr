import * as Types from "shared/types";
import { DataSource } from "../../../types";
import { featuresByYear } from "utils/featuresByYear";
import * as DC from "dataConstants";

const OPTIONAL_DATA_SOURCES = new Set([DataSource.EHR, DataSource.ECDS]);

export const validateAtLeastOneDataSourceType = (
  data: Types.DataSource,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  const dataSources = data.DataSourceSelections;
  const selectedDataSources = data[DC.DATA_SOURCE] as string[] | undefined;
  const dataSourceDescription = data[DC.DATA_SOURCE_DESCRIPTION]?.trim();

  const dataSourceLabel = featuresByYear.useDataCollectionMethod
    ? "Data Collection Method"
    : "Data Source";

  if (
    featuresByYear.useDataCollectionMethod &&
    Array.isArray(selectedDataSources) &&
    selectedDataSources.length >= 2 &&
    !dataSourceDescription
  ) {
    errorArray.push({
      errorLocation: "Data Collection Method",
      errorMessage:
        "Please describe which reporting entities used each selected data collection method",
    });
  }

  if (dataSources) {
    const getGeneratedMessage = (lookupKey: string, label: string) => {
      if (
        featuresByYear.useDataCollectionMethod &&
        lookupKey === DataSource.Other
      ) {
        return "Please describe the Other Data Collection Method or Data Source";
      }
      const sourceSuffix =
        !label.includes("Source") && !label.includes("Method") ? " Source" : "";
      return `Please describe the ${label}${sourceSuffix}`;
    };

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
        const label = Types.getDataSourceDisplayName(lookupKey);

        return {
          errorLocation: dataSourceLabel,
          errorMessage: errorMessage ?? getGeneratedMessage(lookupKey, label),
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
