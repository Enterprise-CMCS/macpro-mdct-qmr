import * as CUI from "@chakra-ui/react";
import { Alert } from "@cmsgov/design-system";
import { getDataSourceDisplayName } from "shared/types";
import { CombinedRatesPayload, DataSourcePayload, isDefined } from "types";
import { featuresByYear } from "utils/featuresByYear";

type Props = {
  payload?: CombinedRatesPayload;
  year?: string;
};

const programDisplayNames = {
  Medicaid: "Medicaid",
  CHIP: "Separate CHIP",
} as const;

export const DataSourceInformationBanner = ({ payload, year }: Props) => {
  const DataSources = payload?.DataSources;
  const programTypes = ["Medicaid", "CHIP"] as const;
  const dataSourceLabel = featuresByYear.useDataCollectionMethod
    ? "Data Collection Method"
    : "Data Source";

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
          {`${programDisplayNames[programType]} ${dataSourceLabel}`}
        </CUI.Heading>

        {DataSources?.[programType].DataSource.length ? (
          DataSources[programType].DataSource.map((dataSource: string) => {
            return (
              <CUI.UnorderedList key={`${dataSource}-${idx}`}>
                <CUI.Heading tabIndex={0} pt={"1.25rem"} size="sm">
                  {getDataSourceDisplayName(dataSource, year)}
                </CUI.Heading>
                {dataSourceSelections(
                  dataSource,
                  DataSources[programType].DataSourceSelections,
                  year
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
  dataSourceSelections: DataSourcePayload["DataSourceSelections"],
  year?: string
) => {
  let selected = [];

  //remapping the object to a more usable array
  const dataSourceArray = Object.entries(dataSourceSelections).map(
    (selection) => {
      return { key: selection[0], ...selection?.[1] };
    }
  );

  //we want only they key for the top layer checkboxes and the current dataSource
  const parentDataSource = dataSourceArray.filter(
    (selection) =>
      !selection.key.includes("-") && selection.key.includes(dataSource)
  );
  //these will contain checkbox and textboxes of the parent data source checkbox
  const childDataSource = dataSourceArray.filter((selection) =>
    selection.key.includes("-")
  );

  const selections = parentDataSource
    .flatMap((selection) => selection.selected)
    .filter(isDefined);
  const descriptions = parentDataSource
    .flatMap((selection) => selection.description)
    .filter(isDefined);

  //if nothing has been selected or if it doesn't have a textbox input, return not answered
  if (selections.length === 0 && descriptions.length === 0)
    return ["Not Answered"];

  //selected values are in their key names so we need to clean them
  selected.push(
    ...selections.map((key) => {
      //see if there's a textfield associated with this data source selection
      const textfield = childDataSource.find((source) =>
        source.key.split("-")[1].includes(key)
      );
      const textfieldData = textfield?.description
        ? ` - ${textfield.description}`
        : "";
      return `${getDataSourceDisplayName(key, year)}${textfieldData}`;
    })
  );
  //descriptions do not need formatting so they can be added straight to the array
  if (descriptions.length > 0) selected.push(...descriptions);

  return selected;
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
