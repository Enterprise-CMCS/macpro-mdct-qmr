import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { measuresList } from "measures/measuresList";
import { useParams, useNavigate } from "react-router-dom";
import { AddCoreSetCards } from "./AddCoreSetCards";
import { TiArrowUnsorted } from "react-icons/ti";
import { formatTableItems } from "./helpers";
import { CoreSetAbbr, UserRoles } from "types";
import { useQueryClient } from "react-query";
import { useUser } from "hooks/authHooks";
import { useCompleteAllMeasures } from "hooks/useCompleteAllMeasures";

interface Data {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

const ReportingYear = () => {
  const navigate = useNavigate();
  const { state, year } = useParams();
  const reportingYears = Object.keys(measuresList);

  const reportingyearOptions = reportingYears.map((year: string) => ({
    displayValue: year + " Core Set",
    value: year,
  }));

  return (
    <CUI.Box w={{ base: "full", md: "48" }}>
      <CUI.Text fontSize="sm" fontWeight="600" mb="2">
        Reporting Year
      </CUI.Text>
      <CUI.Select
        data-testid="select"
        borderRadius="sm"
        icon={<TiArrowUnsorted />}
        value={year}
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
        <CUI.Heading size="lg">
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

export const StateHome = () => {
  const { state, year } = useParams();
  const queryClient = useQueryClient();
  const mutation = useCompleteAllMeasures({
    coreSet: CoreSetAbbr.ACS,
    state,
    year,
  });

  // TODO: reload on succsessful submission
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

  const handleDelete = (data: Data) => {
    switch (data.coreSet) {
      // if its a combined child or hh core set we can just delete the one targetted
      case CoreSetAbbr.CCS:
      case CoreSetAbbr.HHCS:
        deleteCoreSet.mutate(data, {
          onSuccess: () => {
            queryClient.refetchQueries();
          },
        });
        break;
      // if its a chip or medicaid child coreset we delete them both
      case CoreSetAbbr.CCSC:
      case CoreSetAbbr.CCSM:
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

  const completeAllMeasures = () => {
    mutation.mutate();
  };

  if (error) {
    console.log({ error });
    return (
      <QMR.Notification alertStatus="error" alertTitle="An Error Occured" />
    );
  }
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const formattedTableItems = formatTableItems({
    items: data.Items,
    handleDelete,
    completeAllMeasures,
  });

  const childCoreSetExists = formattedTableItems.some(
    (v) =>
      v.coreSet === CoreSetAbbr.CCS ||
      v.coreSet === CoreSetAbbr.CCSC ||
      v.coreSet === CoreSetAbbr.CCSM
  );
  const healthHomesCoreSetExists = formattedTableItems.some(
    (v) => v.coreSet === CoreSetAbbr.HHCS
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
          healthHomesCoreSetExists={healthHomesCoreSetExists}
        />
      </CUI.HStack>
    </QMR.StateLayout>
  );
};
