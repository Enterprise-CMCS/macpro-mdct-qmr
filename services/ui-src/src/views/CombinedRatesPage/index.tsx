import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useGetMeasures } from "hooks/api";
import { MeasureData } from "types";
import { measureDescriptions } from "measures/measureDescriptions";
import { Link, useParams } from "react-router-dom";
import { MeasureTableItem } from "components/Table/types";

const GetColumns = () => {
  return [
    {
      header: "Abbreviation",
      id: "aabr_column_header",
      styleProps: { textAlign: "center", width: "10%" },
      cell: (data: MeasureTableItem.Data) => {
        return (
          <Link to={data.path}>
            <CUI.Text fontWeight="bold" color="blue.600" data-cy={data.abbr}>
              {data.abbr}
            </CUI.Text>
          </Link>
        );
      },
    },
    {
      header: "Measure",
      id: "title_column_header",
      cell: (data: MeasureTableItem.Data) => {
        return (
          <Link to={data.path}>
            <CUI.Text fontWeight="bold" color="blue.600" data-cy={data.path}>
              {data.title}
            </CUI.Text>
          </Link>
        );
      },
    },
  ];
};

const GetMeasuresByCoreSet = (coreSet: string, year: string) => {
  const { data } = useGetMeasures(coreSet);
  const measures = data?.Items as MeasureData[];
  const formatted = measures
    ?.filter(
      // filter out the coreset qualifiers
      (item) => item.measure && item.measure !== "CSQ"
    )
    .sort((a, b) => a?.measure?.localeCompare(b?.measure));

  return formatted?.map((item) => {
    return {
      id: item.measure,
      abbr: item.measure,
      title: measureDescriptions[year][item.measure],
      path: "/",
    } as MeasureTableItem.Data;
  });
};

export const CombinedRatesPage = () => {
  const coreSetAbbr = [
    { abbr: "CCSC", title: "Child Core Set" },
    { abbr: "ACSC", title: "Adult Core Set" },
  ];
  const { state, year } = useParams();
  let data = coreSetAbbr.map((coreSet) =>
    GetMeasuresByCoreSet(coreSet.abbr, year!)
  );

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}`,
          name: "Combined Rates",
        },
      ]}
    >
      <CUI.VStack
        maxW="7xl"
        pb="6"
        pr={{ md: "4rem" }}
        alignItems="flex-start"
        spacing="6"
        padding="2rem"
      >
        <CUI.Heading size="lg" data-cy="combined-rates-heading">
          Core Set Measures Combined Rates
        </CUI.Heading>
        <CUI.Text>
          Instructions for the user - includes how to interpret the page and
          what they need to do to see rates (i.e. complete all measures)
        </CUI.Text>
        <CUI.Tabs variant="enclosed" width="100%">
          <CUI.TabList>
            {coreSetAbbr.map((coreSet) => (
              <CUI.Tab key={coreSet.title + "tab"}>{coreSet.title}</CUI.Tab>
            ))}
          </CUI.TabList>
          <CUI.TabPanels border="1px">
            {data?.map((measures, idx) => (
              <CUI.TabPanel key={"panel" + idx}>
                {measures?.length > 0 ? (
                  <QMR.Table data={measures} columns={GetColumns()} />
                ) : (
                  <CUI.Text textAlign="center" padding="16">
                    No core sets have been added
                  </CUI.Text>
                )}
              </CUI.TabPanel>
            ))}
          </CUI.TabPanels>
        </CUI.Tabs>
      </CUI.VStack>
    </QMR.StateLayout>
  );
};
