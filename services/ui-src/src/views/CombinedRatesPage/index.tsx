import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useGetMeasures } from "hooks/api";
import { AnyObject, CoreSetAbbr, MeasureData, coreSetType } from "types";
import { measureDescriptions } from "measures/measureDescriptions";
import { Link, useParams } from "react-router-dom";
import { MeasureTableItem } from "components/Table/types";
import { useFlags } from "launchdarkly-react-client-sdk";

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

export const GetCoreSetTabs = (abbr: CoreSetAbbr[]) => {
  //indicating which coreSet we want to look at, correctly we want adult & child but not health home
  const coreSetToLoad: CoreSetAbbr[] = [CoreSetAbbr.CCS, CoreSetAbbr.ACS];

  const coreSetTabs: AnyObject[] = [];
  coreSetToLoad.forEach((coreSet: CoreSetAbbr) => {
    const title = `${coreSetType[coreSet]} Core Set`;
    //since the measures are the same for either combined or separated, we just the first result since we want to load only once
    const coreSetAbbr = abbr?.find((item) => item.includes(coreSet));
    coreSetTabs.push({ abbr: coreSetAbbr ?? "", title: title });
  });
  return coreSetTabs;
};

export const CombinedRatesPage = () => {
  //feature flag for the current year
  const releasedTwentyTwentyFour = useFlags()?.["release2024"];
  const { data, isLoading } = Api.useGetCoreSets(releasedTwentyTwentyFour);
  const coreSetsAbbr = data?.Items?.map(
    (coreSet: AnyObject) => coreSet.coreSet
  );
  const coreSetTabs = GetCoreSetTabs(coreSetsAbbr);
  const { state, year } = useParams();
  let coreSetData = coreSetTabs.map((coreSet) =>
    GetMeasuresByCoreSet(coreSet.abbr, year!)
  );

  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

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
        <CUI.Tabs width="100%" variant="unstyled">
          <CUI.TabList>
            {coreSetTabs.map((coreSet) => (
              <CUI.Tab
                key={coreSet.title + "tab"}
                padding={{ base: "2% 10%", md: "10px 40px" }}
                width={{ base: "100%", md: "fit-content" }}
              >
                {coreSet.title}
              </CUI.Tab>
            ))}
          </CUI.TabList>
          <CUI.TabPanels border="1px" borderColor="gray.200">
            {coreSetData?.map((measures, idx) => (
              <CUI.TabPanel key={"panel" + idx}>
                {measures?.length > 0 ? (
                  <QMR.Table data={measures} columns={GetColumns()} />
                ) : (
                  <CUI.Text textAlign="center" padding="16">
                    No core sets have been added.
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
