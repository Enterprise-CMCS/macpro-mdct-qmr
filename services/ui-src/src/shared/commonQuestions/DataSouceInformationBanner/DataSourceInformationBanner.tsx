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
                    {item}
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

export const dataSourceSelections = (
  dataSource: string,
  dataSourceSelections: AnyObject
) => {
  let selected = [];
  //filter the dataSourceSelections object keys that matches the dataSource name
  const dataSourceKey = Object.keys(dataSourceSelections).filter((key) =>
    key.split("-")[0].includes(dataSource)
  );
  //use the key ids to obtain the values
  const dataSourceValue = dataSourceKey.map((key) => dataSourceSelections[key]);

  if (dataSourceKey && dataSourceKey.length > 0) {
    //if more than one key exist, it is possibly a nested data source
    if (dataSourceKey.length > 1) {
      const dataSources: string[] = dataSourceValue
        .filter((source) => source.selected)
        .map((item) => item.selected)
        .flat();

      selected.push(
        ...dataSources.map((source: string) => {
          const sourceKey = dataSourceKey.find((key) => key.includes(source));
          const formattedSource = formatCamelCaseWithInitialisms(source);
          return sourceKey
            ? `${formattedSource} - ${
                dataSourceSelections[sourceKey]?.description ?? "Not Answered"
              }`
            : formattedSource;
        })
      );
    } else {
      const { description, selected: selectedValue } =
        dataSourceSelections[dataSourceKey[0]];

      //either description is null or selected is null, only one will exist on the object
      const value = selectedValue
        ? (selectedValue as any[]).map((item) =>
            formatCamelCaseWithInitialisms(item)
          )
        : [!!description ? description : "Not Answered"];

      selected.push(...value);
    }
  }
  return selected;
};

export const formatCamelCaseWithInitialisms = (str: string) => {
  let spacedString = str
    .replace(/([a-z])([A-Z])|(?<!^)([A-Z][a-z])/g, "$1 $2$3")
    .trim();
  spacedString = spacedString.replace(/([A-Z]+)(?=[A-Z][a-z]|\s|$)/g, "($1)");

  return spacedString;
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
