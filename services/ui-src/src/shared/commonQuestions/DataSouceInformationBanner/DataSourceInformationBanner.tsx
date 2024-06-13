import * as CUI from "@chakra-ui/react";
import { AnyObject } from "types";

interface Props {
  data: AnyObject[];
}
const columns = ["Medicaid", "CHIP"];
export const DataSourceInformationBanner = ({ data }: Props) => {
  const filteredData = columns.map(
    (column) => data?.find((item) => item?.column === column) ?? {}
  );

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

  const dataSourceSelections = (
    dataSource: string,
    dataSourceSelections: AnyObject
  ) => {
    let selected = [];

    for (const [key, value] of Object.entries(dataSourceSelections)) {
      if (key.includes(dataSource)) {
        if (value && (value as any)?.selected) {
          selected.push(...(value as any)?.selected);
        }
      }
    }
    return selected;
  };

  const formatCamelCaseWithInitialisms = (str: string) => {
    let spacedString = str
      .replace(/([a-z])([A-Z])|(?<!^)([A-Z][a-z])/g, "$1 $2$3")
      .trim();
    spacedString = spacedString.replace(/([A-Z]+)(?=[A-Z][a-z]|\s|$)/g, "($1)");

    return spacedString;
  };

  const renderData = columns.map((column, idx) => {
    return (
      <CUI.Box
        sx={sx.infoBannerDesktop.section}
        as={"section"}
        key={`data-source-component-${idx}`}
      >
        <CUI.Heading
          tabIndex={0}
          pt={"1.25rem"}
          sx={sx.header}
          data-cy={`data-source-component-${column}-heading`}
        >
          {`${column} Data Source`}
        </CUI.Heading>

        {filteredData?.[idx]?.dataSource ? (
          filteredData?.[idx]?.dataSource?.map((dataSource: string) => {
            return (
              <CUI.UnorderedList key={`data-src-${idx}`}>
                <CUI.Heading tabIndex={0} pt={"1.25rem"} size="sm">
                  {dataSourceSubsection(dataSource)}
                </CUI.Heading>
                {dataSourceSelections(
                  dataSource,
                  filteredData?.[idx]?.dataSourceSelections!
                ).map((item, srcIdx) => (
                  <CUI.ListItem tabIndex={0} key={`data-src-${idx}${srcIdx}`}>
                    {formatCamelCaseWithInitialisms(item)}
                  </CUI.ListItem>
                ))}
              </CUI.UnorderedList>
            );
          })
        ) : (
          <CUI.Text tabIndex={0}>Not answered</CUI.Text>
        )}
      </CUI.Box>
    );
  });

  return (
    <>
      <CUI.Show above="md">
        <CUI.Flex
          tabIndex={0}
          aria-label="Combined Rate Data Source Information Banner"
          sx={sx.infoBannerDesktop}
          gap={"3rem"}
        >
          {renderData}
        </CUI.Flex>
      </CUI.Show>

      <CUI.Show below="md">
        <CUI.Flex
          tabIndex={0}
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
