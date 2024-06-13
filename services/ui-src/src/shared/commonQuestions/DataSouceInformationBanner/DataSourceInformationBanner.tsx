import * as CUI from "@chakra-ui/react";
import * as json from "./combinedRates.json";

export const DataSourceInformationBanner = () => {
  const { data } = json;

  const newData = structuredClone(data);
  newData[0].dataSource?.reverse();
  newData[1].dataSource?.reverse();
  const filteredData = newData
    .filter((item) => item.column === "CHIP" || item.column === "Medicaid")
    .reverse();

  const dataSourceSubsection = (dataSource: string) => {
    if (dataSource === "AdministrativeData") {
      return "Administrative Data";
    } else if (dataSource === "HybridAdministrativeandMedicalRecordsData") {
      return "Hybrid (Administrative and Medical Records Data)";
    } else if (dataSource === "Other") {
      return "Other Data Source";
    }
    return;
  };

  const dataSourceSelections = (dataSource: any, dataSourceSelections: any) => {
    let selected: any = [];

    if (dataSource === "AdministrativeData") {
      selected = [];
      selected.push(...dataSourceSelections.AdministrativeData0.selected);
      return selected;
    }

    if (dataSource === "HybridAdministrativeandMedicalRecordsData") {
      selected = [];
      selected.push(
        ...dataSourceSelections.HybridAdministrativeandMedicalRecordsData0
          .selected
      );
      selected.push(
        ...dataSourceSelections.HybridAdministrativeandMedicalRecordsData1
          .selected
      );
      return selected;
    }

    // we dont have data for other data source yet
    if (dataSource === "OtherDataSource") {
      selected = [];
      selected.push("Sample text field of other data");
      return selected;
    }

    return selected;
  };

  const addSpaceToCamelCase = (str: any) => {
    return str.replace(/([a-z])([A-Z])|(?<!^)([A-Z][a-z])/g, "$1 $2$3").trim();
  };

  const renderData = filteredData.map((data: any) => {
    return (
      <CUI.Box sx={sx.infoBannerDesktop.section} as={"section"}>
        <CUI.Heading
          tabindex="0"
          pt={"1.25rem"}
          sx={sx.header}
          data-cy={`data-source-component-${data.column}-heading`}
        >
          {`${data.column} Data Source`}
        </CUI.Heading>

        {data.dataSource ? (
          data.dataSource.map((dataSource: any) => {
            return (
              <CUI.UnorderedList>
                <CUI.Heading tabindex="0" pt={"1.25rem"} size="sm">
                  {dataSourceSubsection(dataSource)}
                </CUI.Heading>

                {dataSourceSelections(
                  dataSource,
                  data.dataSourceSelections
                ).map((item: any) => (
                  <CUI.ListItem tabindex="0">
                    {addSpaceToCamelCase(item)}
                  </CUI.ListItem>
                ))}
              </CUI.UnorderedList>
            );
          })
        ) : (
          <CUI.Text tabindex="0">Not answered</CUI.Text>
        )}
      </CUI.Box>
    );
  });

  return (
    <>
      <CUI.Show above="md">
        <CUI.Flex
          tabindex="0"
          aria-label="Combined Rate Data Source Information Banner"
          sx={sx.infoBannerDesktop}
          gap={"3rem"}
        >
          {renderData}
        </CUI.Flex>
      </CUI.Show>

      <CUI.Show below="md">
        <CUI.Flex
          tabindex="0"
          aria-label="Combined Rate Data Source Information Banner"
          sx={sx.infoBannerMobile}
          gap={"2rem"}
        >
          {renderData}
        </CUI.Flex>
      </CUI.Show>
    </>
  );
};

const sx = {
  infoBannerDesktop: {
    background: "#EEFBFF",
    padding: "27px",
    ul: {
      marginLeft: "0",
      li: {
        marginLeft: "1.5rem",
      },
    },
    section: {
      width: "50%",
    },
  },
  infoBannerMobile: {
    background: "#EEFBFF",
    padding: "27px",
    flexDirection: "column",
    ul: {
      marginLeft: "0",
      li: {
        marginLeft: "1.5rem",
      },
    },
    section: {
      width: "100%",
    },
  },
  header: {
    color: "#262626",
    fontSize: "1.313rem",
    paddingTop: "0",
  },
  subheader: {
    fontWeight: "bold",
  },
};
