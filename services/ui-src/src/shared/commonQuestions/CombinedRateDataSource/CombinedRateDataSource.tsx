import * as CUI from "@chakra-ui/react";
import * as json from "./combinedRates.json";

export const CombinedRateDataSource = () => {
  const { data } = json;

  const filteredData = data.filter((item) => item.column !== "Combined Rate");

  return (
    <CUI.Flex
      tabindex="0"
      aria-label="Combined Rate Data Source"
      sx={sx.combinedRateDataSourceTable}
      gap={"4rem"}
    >
      {filteredData.map((data) => {
        return (
          <CUI.Box sx={sx.section} as={"section"}>
            <CUI.Heading
              tabindex="0"
              pt={"1.25rem"}
              sx={sx.header}
              data-cy={`data-source-component-${data.column}-heading`}
            >
              {`${data.column} Data Source`}
            </CUI.Heading>

            {data.dataSource ? (
              data.dataSource.map((dataSource) => {
                return (
                  <CUI.UnorderedList>
                    <CUI.Heading tabindex="0" pt={"1.25rem"} size="sm">
                      {dataSource}
                    </CUI.Heading>
                    <CUI.ListItem tabindex="0">
                      Data Source Details
                    </CUI.ListItem>
                  </CUI.UnorderedList>
                );
              })
            ) : (
              <CUI.Text tabindex="0">Not answered</CUI.Text>
            )}
          </CUI.Box>
        );
      })}
    </CUI.Flex>
  );
};

const sx = {
  combinedRateDataSourceTable: {
    background: "#EEFBFF",
    padding: "27px",

    li: {
      marginLeft: "1.5rem",
    },
  },
  section: {
    width: "50%",
  },
  header: {
    color: "#262626",
    fontSize: "1.313rem",
  },
  subheader: {
    fontWeight: "bold",
  },
};
