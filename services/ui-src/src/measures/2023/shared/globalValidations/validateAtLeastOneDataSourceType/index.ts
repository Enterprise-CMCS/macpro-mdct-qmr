import * as Types from "measures/2023/shared/CommonQuestions/types";

export const validateAtLeastOneDataSourceType = (
  data: Types.DataSource,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  const dataSources = data.DataSourceSelections;
  if (dataSources) {
    Object.entries(dataSources).forEach((source) => {
      const index = source
        .map((s) => {
          return typeof s === "object";
        })
        .indexOf(true);
      if (!Object.values(source[index])[0]) {
        const dataErrorMessage = source.includes("OtherDataSource")
          ? "Please describe the Other Data Source"
          : "You must select a data source";
        errorArray.push({
          errorLocation: "Data Source",
          errorMessage: errorMessage ?? dataErrorMessage,
        });
      }
    });
  }

  return errorArray;
};
