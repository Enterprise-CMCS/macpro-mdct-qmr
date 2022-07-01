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

  const reportingyearOptions: IRepYear[] =
    reportingYears && reportingYears.length
      ? reportingYears?.map((year: string) => ({
          displayValue: year + " Core Set",
          value: year,
        }))
      : [{ displayValue: `${year} Core Set`, value: `${year}` }];

  return (
    <CUI.Box w={{ base: "full", md: "48" }}>
      <CUI.Text fontSize="sm" fontWeight="600" mb="2">
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
    </CUI.Box>
  );
};

const Heading = () => {
  const { year } = useParams();
  return (
    <CUI.Box display={{ base: "block", md: "flex" }}>
      <CUI.Box maxW="3xl" pb="6">
        <CUI.Heading size="lg" data-cy="reporting-year-heading">
          {`FFY ${year} Core Set Measures Reporting`}
        </CUI.Heading>
        <CUI.Text fontWeight="bold" py="6">
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
  const { data, error, isLoading } = Api.useGetCoreSets();
  const { userState, userRole } = useUser();
  const deleteCoreSet = Api.useDeleteCoreSet();
  if (userState && userState !== state && userRole === UserRoles.STATE) {
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
    // if its a combined child or hh core set we can just delete the one targetted
    if (
      data.coreSet === CoreSetAbbr.CCS ||
      data.coreSet.includes(CoreSetAbbr.HHCS)
    ) {
      deleteCoreSet.mutate(data, {
        onSuccess: () => {
          queryClient.refetchQueries();
        },
      });
    }
    // if its a chip or medicaid child coreset we delete them both
    else if (
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

  if (error) {
    console.log({ error });
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
  const spaIds = filteredSpas.map((s) => s.id);

  const formattedTableItems = formatTableItems({
    items: data.Items,
    handleDelete,
    updateAllMeasures,
    resetCoreSet,
    filteredSpas,
  });

  const childCoreSetExists = formattedTableItems.some(
    (v) =>
      v.coreSet === CoreSetAbbr.CCS ||
      v.coreSet === CoreSetAbbr.CCSC ||
      v.coreSet === CoreSetAbbr.CCSM
  );

  const filteredHealthHomeCoreSets = formattedTableItems.filter(
    (v) => !!v?.coreSet?.includes(CoreSetAbbr.HHCS)
  );
  const allPossibleHealthHomeCoreSetsExist = !!(
    filteredHealthHomeCoreSets.length &&
    spaIds.every((s) =>
      filteredHealthHomeCoreSets.some((v) => !!v?.coreSet?.includes(s))
    )
  );

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: "Core Set Measures" },
      ]}
    >
      {data.Items && data.Items.length === 0 && (
        <CUI.Box data-testid="no-state-data">
          <QMR.Notification
            alertStatus="warning"
            alertTitle="There is currently no data for this State"
          />
        </CUI.Box>
      )}
      <Heading />
      <QMR.Table data={formattedTableItems} columns={QMR.coreSetColumns} />
      <CUI.HStack spacing="6">
        <AddCoreSetCards
          childCoreSetExists={childCoreSetExists}
          healthHomesCoreSetExists={allPossibleHealthHomeCoreSetsExist}
          renderHealthHomeCoreSet={!!spaIds?.length}
        />
      </CUI.HStack>
    </QMR.StateLayout>
  );
};

export default StateHome;
