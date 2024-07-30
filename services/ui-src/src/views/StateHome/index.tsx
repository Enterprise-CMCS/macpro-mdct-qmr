import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

import { useQueryClient } from "react-query";
import { TiArrowUnsorted } from "react-icons/ti";
import { useParams, useNavigate } from "react-router-dom";

import { SPA } from "libs/spaLib";
import { AddCoreSetCards } from "./AddCoreSetCards";
import { formatTableItems } from "./helpers";
import { CoreSetAbbr, MeasureStatus, UserRoles } from "types";

import { useUser } from "hooks/authHooks";
import { useGetReportingYears } from "hooks/api";
import { useUpdateAllMeasures } from "hooks/useUpdateAllMeasures";
import { useResetCoreSet } from "hooks/useResetCoreSet";
import { BannerCard } from "components/Banner/BannerCard";
import { coreSets, CoreSetField } from "shared/coreSetByYear";

import { useFlags } from "launchdarkly-react-client-sdk";
import { Link } from "react-router-dom";
import { statesWithoutCombinedRates } from "utils";
import { CoreSetTableItem } from "components/Table/types";

interface HandleDeleteData {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

interface UpdateAllMeasuresData {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
  measureStatus: MeasureStatus;
}

interface IRepYear {
  displayValue: string;
  value: string;
}

const ReportingYear = () => {
  const navigate = useNavigate();
  const { state, year } = useParams();
  const { data: reportingYears } = useGetReportingYears();
  const releasedTwentyTwentyFour = useFlags()?.["release2024"];
  // Certain states do not have separate chip and medicaid so we will not
  // display the Combined Rates button for those states
  const showCombinedRatesButton =
    state && !statesWithoutCombinedRates.includes(state);

  let reportingyearOptions: IRepYear[] =
    reportingYears && reportingYears.length
      ? reportingYears?.map((year: string) => ({
          displayValue: year + " Core Set",
          value: year,
        }))
      : [{ displayValue: `${year} Core Set`, value: `${year}` }];

  if (!releasedTwentyTwentyFour) {
    reportingyearOptions = reportingyearOptions.filter(
      (entry) => entry.value !== "2024"
    );
  }

  return (
    <CUI.Box
      w={{ base: "full", md: "48" }}
      display={{ md: "flex" }}
      flexDirection={{ md: "column" }}
      alignItems={{ md: "flex-end" }}
    >
      <CUI.Text fontSize="sm" fontWeight="600" alignSelf={{ md: "flex-start" }}>
        Reporting Year
      </CUI.Text>
      <CUI.Select
        data-testid="select"
        data-cy="year-select"
        borderRadius="sm"
        icon={<TiArrowUnsorted />}
        value={year}
        aria-label="Year to report core set"
        onChange={(e) => {
          navigate(`/${state}/${e.target.value}`);
        }}
      >
        {reportingyearOptions.map(({ displayValue, value }) => (
          <option value={value} key={value}>
            {displayValue}
          </option>
        ))}
      </CUI.Select>
      {year === "2024" && showCombinedRatesButton && (
        <CUI.Box mt="22px">
          <Link
            to={`/${state}/${year}/combined-rates`}
            style={{
              textDecoration: "none",
              marginTop: "22px",
            }}
          >
            <QMR.ContainedButton
              buttonText={"View Combined Rates"}
              buttonProps={{
                colorScheme: "blue",
                variant: "outline",
                color: "blue.500",
                fontSize: "16px",
                width: "220px",
                height: "37px",
              }}
            />
          </Link>
        </CUI.Box>
      )}
    </CUI.Box>
  );
};

const Heading = () => {
  const { year } = useParams();
  return (
    <CUI.Box display={{ base: "block", md: "flex" }}>
      <CUI.Box maxW="3xl" pb="6" pr={{ md: "4rem" }}>
        <CUI.Heading size="lg" data-cy="reporting-year-heading">
          {`FFY ${year} Core Set Measures Reporting`}
        </CUI.Heading>
        <CUI.Text fontWeight="bold" pt="6">
          Complete each group of Core Set Measures below. Once a group is
          completed it can be submitted to CMS for review.
        </CUI.Text>
      </CUI.Box>
      <CUI.Spacer />
      <ReportingYear />
    </CUI.Box>
  );
};

const StateHome = () => {
  const { state, year } = useParams();
  const queryClient = useQueryClient();
  const mutation = useUpdateAllMeasures();
  const resetCoreSetMutation = useResetCoreSet();
  const releasedTwentyTwentyFour = useFlags()?.["release2024"];
  const { data, error, isLoading } = Api.useGetCoreSets(
    releasedTwentyTwentyFour
  );
  const { userState, userRole } = useUser();
  const deleteCoreSet = Api.useDeleteCoreSet();

  // block display from state users without permissions for the corresponding state
  if (userState && userState !== state && userRole === UserRoles.STATE_USER) {
    return (
      <CUI.Box data-testid="unauthorized-container">
        <QMR.Notification
          alertStatus="error"
          alertTitle="You are not authorized to view this page"
        />
      </CUI.Box>
    );
  }

  const handleDelete = (data: HandleDeleteData) => {
    // if its a combined child or hh core set we can just delete the one targeted
    if (
      data.coreSet === CoreSetAbbr.ACS ||
      data.coreSet === CoreSetAbbr.CCS ||
      data.coreSet.includes(CoreSetAbbr.HHCS)
    ) {
      deleteCoreSet.mutate(data, {
        onSuccess: () => {
          queryClient.refetchQueries();
        },
      });
    } else if (
      data.coreSet === CoreSetAbbr.ACSC ||
      data.coreSet === CoreSetAbbr.ACSM
    ) {
      deleteCoreSet.mutate(
        { ...data, coreSet: CoreSetAbbr.ACSC },
        {
          onSuccess: () => {
            deleteCoreSet.mutate(
              { ...data, coreSet: CoreSetAbbr.ACSM },
              {
                onSuccess: () => {
                  queryClient.refetchQueries();
                },
              }
            );
          },
        }
      );
    } else if (
      data.coreSet === CoreSetAbbr.CCSC ||
      data.coreSet === CoreSetAbbr.CCSM
    ) {
      deleteCoreSet.mutate(
        { ...data, coreSet: CoreSetAbbr.CCSC },
        {
          onSuccess: () => {
            deleteCoreSet.mutate(
              { ...data, coreSet: CoreSetAbbr.CCSM },
              {
                onSuccess: () => {
                  queryClient.refetchQueries();
                },
              }
            );
          },
        }
      );
    }
  };

  const updateAllMeasures = (data: UpdateAllMeasuresData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.refetchQueries();
      },
    });
  };

  const resetCoreSet = (data: any) => {
    resetCoreSetMutation.mutate(data, {
      onSuccess: () => {
        queryClient.refetchQueries();
      },
    });
  };

  const exportAll = (data: any) => {
    window.open(`${window.location.href}/${data.coreSet}/pdf`, "_blank");
  };

  if (error) {
    return (
      <QMR.Notification alertStatus="error" alertTitle="An Error Occured" />
    );
  }

  if (
    isLoading ||
    !data.Items ||
    mutation.isLoading ||
    resetCoreSetMutation.isLoading
  ) {
    return <QMR.LoadingWave />;
  }

  const filteredSpas = SPA[year!].filter((s) => s.state === state);
  const spaIds = filteredSpas.map((s) => `${CoreSetAbbr.HHCS}_${s.id}`);

  const formattedTableItems = formatTableItems({
    items: data.Items,
    handleDelete,
    updateAllMeasures,
    resetCoreSet,
    filteredSpas,
    exportAll,
  });

  //get all the coresets that have been added to the table
  const coreSetInTable: string[] = formattedTableItems.map(
    (item) => item.coreSet
  );
  //filter and format all the coreset down
  const coreSetCards = (
    coreSets[year as keyof typeof coreSets] as CoreSetField[]
  )
    .filter(
      (set) =>
        (!set.loaded ||
          (!set.loaded.includes(state!) && set.loaded.length > 0)) &&
        (!set.stateList || set.stateList?.includes(state!))
    )
    .map((set) => {
      //spaIds are only checked against healthHome measures
      const spaInTable = spaIds?.every((id) => coreSetInTable.includes(id));
      //once all the spaIds for this state have been added to the table, push 'HHCS' to the array to tell the system to disable the add button
      if (spaInTable) coreSetInTable.push(CoreSetAbbr.HHCS);
      //the key exist is to trigger the disable state of the add core set button
      return {
        ...set,
        exist: set.abbr?.some((abbr: string) => coreSetInTable?.includes(abbr)),
      };
    });

  //we are using the order of the coresetabbr enums to determine the order of the table items
  const sortedTableItems = Object.values(CoreSetAbbr).map((abbr) => {
    if (abbr === "HHCS")
      return formattedTableItems.filter((item) => item.coreSet.includes(abbr));
    return formattedTableItems.find((item) => item.coreSet === abbr);
  });

  //removing any undefine or empty items
  const filteredTableItems = sortedTableItems
    .flat()
    .filter((item) => item != undefined);

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: "Core Set Measures" },
      ]}
    >
      <CUI.Box py="4">
        <BannerCard />
      </CUI.Box>
      <Heading />
      <QMR.Table data={filteredTableItems} columns={QMR.coreSetColumns} />
      <CUI.Stack direction={{ base: "column", md: "row" }} spacing="6">
        <AddCoreSetCards coreSetCards={coreSetCards} />
      </CUI.Stack>
    </QMR.StateLayout>
  );
};

export default StateHome;
