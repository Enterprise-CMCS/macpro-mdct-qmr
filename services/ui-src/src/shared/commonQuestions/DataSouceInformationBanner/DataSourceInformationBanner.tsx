import * as CUI from "@chakra-ui/react";
import * as json from "./combinedRates.json";

export const DataSourceInformationBanner = () => {
  const { data } = json;

  const filteredData = data.filter((item) => item.column !== "Combined Rate");

  return (
    <>
      <CUI.Show above="md">
        <CUI.Flex
          tabindex="0"
          aria-label="Combined Rate Data Source Information Banner"
          sx={sx.infoBannerDesktop}
          gap={"4rem"}
        >
          {filteredData.map((data) => {
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
      </CUI.Show>

      <CUI.Show below="md">
        <CUI.Flex
          tabindex="0"
          aria-label="Combined Rate Data Source Information Banner"
          sx={sx.infoBannerMobile}
          gap={"2rem"}
        >
          {filteredData.map((data) => {
            return (
              <CUI.Box sx={sx.infoBannerMobile.section} as={"section"}>
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
      </CUI.Show>
    </>
  );
};

const sx = {
  infoBannerDesktop: {
    background: "#EEFBFF",
    padding: "27px",
    li: {
      marginLeft: "1.5rem",
    },
    section: {
      width: "50%",
    },
  },
  infoBannerMobile: {
    background: "#EEFBFF",
    padding: "27px",
    flexDirection: "column",
    li: {
      marginLeft: "1.5rem",
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
