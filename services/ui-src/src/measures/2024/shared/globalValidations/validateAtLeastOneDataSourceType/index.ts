import * as Types from "measures/2024/shared/CommonQuestions/types";

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
      if (
        !Object.values(source[index])[0] ||
        Object.values(source[index])[0].length === 0
      ) {
        let dataErrorMessage;
        if (
          source.includes("AdministrativeData0-AdministrativeDataOther") ||
          source.includes(
            "HybridAdministrativeandMedicalRecordsData0-AdministrativeDataOther"
          )
        ) {
          dataErrorMessage =
            "Please describe the Administrative Other Data Source";
        } else if (source.includes("OtherDataSource")) {
          dataErrorMessage = "Please describe the Other Data Source";
        } else {
          dataErrorMessage = "You must select a data source";
        }
        errorArray.push({
          errorLocation: "Data Source",
          errorMessage: errorMessage ?? dataErrorMessage,
        });
      }
    });
  }

  return errorArray;
};
