import * as CUI from "@chakra-ui/react";
import { Alert } from "@cmsgov/design-system";
import { dataSourceDisplayNames } from "shared/types";
import { CombinedRatesPayload, DataSourcePayload, isDefined } from "types";

type Props = {
  payload?: CombinedRatesPayload;
};

const programDisplayNames = {
  Medicaid: "Medicaid",
  CHIP: "Separate CHIP",
} as const;

export const DataSourceInformationBanner = ({ payload }: Props) => {
  const DataSources = payload?.DataSources;
  const programTypes = ["Medicaid", "CHIP"] as const;
  const dataSourceSubsection = (dataSource: string) => {
    return dataSourceDisplayNames[dataSource] ?? dataSource;
  };

  const unusableExplanation = (dataSources: DataSourcePayload | undefined) => {
    if (!dataSources?.isUnusableForCalc) {
      // If we did do the calculation, do not attempt to explain why we didn't.
      return;
    }
    const explanations = {
      hasECDSDataSource: `These data were reported using the Electronic Clinical Data System (ECDS) Data Source
        (alone or in combination with other data sources).
        The data will not be used to calculate a combined rate below.`,
      hasOtherDataSource: `These data were reported using “Other” Data Source
        (alone or in combination with other data sources).
        The data will not be used to calculate a combined rate below.`,
      hasOtherSpecification: `These data were reported using “Other” Specifications.
        Therefore, the data are not shown below
        and will not be used to calculate a combined rate.`,
    };
    return Object.entries(explanations)
      .filter(
        ([flag, _text]) => dataSources?.[flag as keyof typeof explanations]
      )
      .map(([flag, text]) => (
        <Alert key={flag} style={{ marginTop: "1em" }} variation="warn">
          <CUI.Text>{text}</CUI.Text>
        </Alert>
      ));
  };

  const renderData = programTypes.map((programType, idx) => {
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
          data-cy={`data-source-component-${programType}-heading`}
        >
          {`${programDisplayNames[programType]} Data Source`}
        </CUI.Heading>

        {DataSources?.[programType].DataSource.length ? (
          DataSources[programType].DataSource.map((dataSource: string) => {
            return (
              <CUI.UnorderedList key={`${dataSource}-${idx}`}>
                <CUI.Heading tabIndex={0} pt={"1.25rem"} size="sm">
                  {dataSourceSubsection(dataSource)}
                </CUI.Heading>
                {dataSourceSelections(
                  dataSource,
                  DataSources[programType].DataSourceSelections
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
            Not reported
          </CUI.Text>
        )}
        {unusableExplanation(DataSources?.[programType])}
      </CUI.Box>
    );
  });

  return (
    <>
      <CUI.Hide below="md">
        <CUI.Flex
          tabIndex={0}
          aria-label="Combined Rate Data Source Information Banner"
          sx={sx.infoBannerDesktop}
          gap={"3rem"}
        >
          {renderData}
        </CUI.Flex>
      </CUI.Hide>

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
  dataSourceSelections: DataSourcePayload["DataSourceSelections"]
) => {
  let selected = [];
  //filter the dataSourceSelections object keys that matches the dataSource name
  const dataSourceKey = Object.keys(dataSourceSelections).filter((key) =>
    key.split("-")[0].includes(dataSource)
  );

  //we want only they key for the top layer checkboxes
  const parentKeys = dataSourceKey.filter((key) => !key.includes("-"));

  //use the key ids to obtain the values
  const dataSourceValue = parentKeys.map((key) => dataSourceSelections[key]);

  if (dataSourceKey && dataSourceKey.length > 0) {
    //if more than one key exist, it is possibly a nested data source
    if (dataSourceKey.length > 1) {
      const dataSources = dataSourceValue
        .map((item) => item.selected ?? item.description)
        .filter(isDefined)
        .flat();

      selected.push(
        ...dataSources.map((source) => {
          const sourceKey = dataSourceKey.find((key) => key.includes(source));
          const formattedSource = lookupDataSource(source);
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
        ? (selectedValue as any[]).map((item) => lookupDataSource(item))
        : [!!description ? description : "Not Answered"];

      selected.push(...value);
    }
  }
  return selected;
};

export const lookupDataSource = (str: string) => {
  return dataSourceDisplayNames[str] ?? str;
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
