import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { measuresList } from "measures/measuresList";
import { useParams, useNavigate } from "react-router-dom";
import { AddCoreSetCards } from "./AddCoreSetCards";
import { TiArrowUnsorted } from "react-icons/ti";
import * as Api from "hooks/api";
import { formatTableItems } from "./helpers";
import { CoreSetAbbr, UserRoles } from "types";
import { useQueryClient } from "react-query";
import { useUser } from "hooks/authHooks";
import { SPA } from "libs/spaLib";

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

  if (error) {
    console.log({ error });
    return (
      <QMR.Notification alertStatus="error" alertTitle="An Error Occured" />
    );
  }
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const filteredSpas = SPA.filter((s) => s.state === state);
  const spaIds = filteredSpas.map((s) => s.id);

  const formattedTableItems = formatTableItems({
    items: data.Items,
    handleDelete,
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
