import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useGetMeasures } from "hooks/api";
import { MeasureData } from "types";
import { measureDescriptions } from "measures/measureDescriptions";
import { useParams } from "react-router-dom";

const GetCoreSetPanel = (coreSet: string) => {
  const { data } = useGetMeasures(coreSet);
  const items = data?.Items as MeasureData[];
  return items
    ?.filter(
      // filter out the coreset qualifiers
      (item) => item.measure && item.measure !== "CSQ"
    )
    .sort((a, b) => a?.measure?.localeCompare(b?.measure));
};

export const CombinedRatesPage = () => {
  const coreSetAbbr = ["ACSC", "CCSC"];
  let panelItems = coreSetAbbr.map((coreSet) => GetCoreSetPanel(coreSet));
  const { state, year } = useParams();

  // const tableData = [];
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
        <CUI.Tabs variant="enclosed">
          <CUI.TabList>
            {coreSetAbbr.map((coreSet) => (
              <CUI.Tab>{coreSet}</CUI.Tab>
            ))}
          </CUI.TabList>
          <CUI.TabPanels>
            {panelItems?.map((items) => (
              <CUI.TabPanel>
                {/* <QMR.Table data={measures} columns={QMR.measuresColumns(year)} /> */}
                {items?.map((item: any) => (
                  <CUI.Link to={`combined-rates`}>
                    <CUI.Text>{item?.measure}</CUI.Text>
                    <CUI.Text>
                      {measureDescriptions?.[year!]?.[item?.measure]}
                    </CUI.Text>
                  </CUI.Link>
                ))}
              </CUI.TabPanel>
            ))}
          </CUI.TabPanels>
        </CUI.Tabs>
      </CUI.VStack>
    </QMR.StateLayout>
  );
};
