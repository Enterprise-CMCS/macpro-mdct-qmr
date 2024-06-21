import * as CUI from "@chakra-ui/react";
import { AnyObject } from "types";

interface Props {
  data: AnyObject[];
}
const columns = ["Medicaid", "CHIP"];

const DataSourceRecord: Record<string, string> = {
  AdministrativeData: "Administrative Data",
  HybridAdministrativeandMedicalRecordsData:
    "Hybrid (Administrative and Medical Records Data)",
  OtherDataSource: "Other Data Source",
  ElectronicHealthRecords: "Electronic Health Record (EHR) Data",
  ElectronicClinicalDataSystemsECDS: "Electronic Clinical Data Systems (ECDS)",
  Casemanagementrecordreview: "Case management record review",
};

export const DataSourceInformationBanner = ({ data }: Props) => {
  const filteredData = columns.map(
    (column) => data?.find((item) => item?.column === column) ?? {}
  );

  const dataSourceSubsection = (dataSource: string) => {
    return DataSourceRecord[dataSource] ?? dataSource;
  };

  const dataSourceSelections = (
    dataSource: string,
    dataSourceSelections: AnyObject
  ) => {
    let selected = [];
    const selectedKey = Object.keys(dataSourceSelections).filter((key) =>
      key.split("-")[0].includes(dataSource)
    );

    if (selectedKey && selectedKey.length > 0) {
      if (selectedKey.length > 1) {
        const primaryKey = selectedKey[0].split("-")[0];
        const selections: string[] = dataSourceSelections[primaryKey]?.selected;
        selected.push(
          ...selections.map((selection: string) => {
            const descKey = selectedKey.find((key) => key.includes(selection));
            if (descKey)
              return `${selection} - ${dataSourceSelections[descKey].description}`;
            return selection;
          })
        );
      } else {
        const { description, selected: selectedValue } =
          dataSourceSelections[selectedKey[0]];
        if (description) {
          selected.push(description);
        }
        if (selectedValue) {
          selected.push(...selectedValue);
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

        {filteredData?.[idx]?.dataSource &&
        filteredData?.[idx]?.dataSource.length > 0 ? (
          filteredData?.[idx]?.dataSource?.map((dataSource: string) => {
            return (
              <CUI.UnorderedList key={`${dataSource}-${idx}`}>
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
          <CUI.Text tabIndex={0} pt="1.25rem">
            Not answered
          </CUI.Text>
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
