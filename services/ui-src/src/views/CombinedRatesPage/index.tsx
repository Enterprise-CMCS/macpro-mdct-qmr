import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useGetMeasures } from "hooks/api";
import { AnyObject, CoreSetAbbr, MeasureData, coreSetType } from "types";
import { measureDescriptions } from "measures/measureDescriptions";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { MeasureTableItem } from "components/Table/types";
import { useFlags } from "launchdarkly-react-client-sdk";
import { statesWithoutCombinedRates } from "utils";
import { featuresByYear } from "utils/featuresByYear";

const measuresWithoutPerformanceData = ["CSQ", "CPC-CH", "CPA-AD", "MSC-AD"];

const GetColumns = () => {
  return [
    {
      header: "Abbreviation",
      id: "aabr_column_header",
      styleProps: { textAlign: "center", width: "10%" },
      cell: (data: MeasureTableItem.Data) => {
        return (
          <Link to={data.path} aria-label={data.abbr}>
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
          <Link to={data.path} aria-label={data.title}>
            <CUI.Text fontWeight="bold" color="blue.600" data-cy={data.path}>
              {data.title}
            </CUI.Text>
          </Link>
        );
      },
    },
  ];
};

const GetMeasuresByCoreSet = (coreSet: string, state: string, year: string) => {
  const { data } = useGetMeasures(coreSet);
  const measures = data?.Items as MeasureData[];
  const formatted = measures
    ?.filter(
      // filter out all the measures that do not have combined rates:
      // the coreset qualifiers (CSQ), measures that are autocompleted,
      // and the measures that are not asked to report performance measure data
      (item) =>
        !item.autoCompleted &&
        !measuresWithoutPerformanceData.includes(item.measure)
    )
    .sort((a, b) => a?.measure?.localeCompare(b?.measure));

  return formatted?.map((item) => {
    return {
      id: item.measure,
      abbr: item.measure,
      title: measureDescriptions[year][item.measure],
      path: `/${state}/${year}/combined-rates/${item.measure}`,
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
  const releasedTwentyTwentyFive = useFlags()?.["release2025"];
  const { data, isLoading } = Api.useGetCoreSets(releasedTwentyTwentyFive);
  const coreSetsAbbr = data?.Items?.map(
    (coreSet: AnyObject) => coreSet.coreSet
  );
  const coreSetTabs = GetCoreSetTabs(coreSetsAbbr);
  const { state, year } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let coreSetData = coreSetTabs.map((coreSet) =>
    GetMeasuresByCoreSet(coreSet.abbr, state!, year!)
  );

  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  // block display from states that do not have combined rates
  if (state && statesWithoutCombinedRates.includes(state)) {
    return (
      <CUI.Box data-testid="unauthorized-container">
        <QMR.Notification
          alertStatus="error"
          alertTitle={`Combined rates for ${state} are not supported`}
        />
      </CUI.Box>
    );
  }

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        {
          path: `/${state}/${year}`,
          name: `${featuresByYear.displayFFYLanguage ? "FFY" : ""} ${year}`,
        },
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
          Click into a measure below to preview the preliminary combined
          Medicaid and CHIP rate. Please complete the measure in both the
          Medicaid and CHIP reports to ensure the combined rate is complete.
        </CUI.Text>
        <CUI.Text>
          The following measures are excluded from the combined rates page
          because states are not asked to report performance measure data for
          these measures for 2025 Core Sets reporting in the online reporting
          system: CPC-CH, LBW-CH, LRCD-CH, CPA-AD, LRCD-AD, and NCIIDD-AD.
          MSC-AD is also excluded from the combined rates page because the
          measure uses survey data.
        </CUI.Text>
        <CUI.Tabs
          width="100%"
          variant="unstyled"
          onChange={(index) =>
            setSearchParams({ tab: index == 0 ? "child" : "adult" })
          }
          defaultIndex={searchParams.get("tab") === "adult" ? 1 : 0}
        >
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
