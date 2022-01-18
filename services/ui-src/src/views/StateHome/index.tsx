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
    switch (data.coreSet) {
      // if its a combined child or hh core set we can just delete the one targetted
      case CoreSetAbbr.CCS:
      case CoreSetAbbr.HHCS:
        deleteCoreSet.mutate(data, {
          onSuccess: () => {
            queryClient.refetchQueries(["coreSets", state, year]);
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
                    queryClient.refetchQueries(["coreSets", state, year]);
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
    // we should have a loading state here
    return (
      <CUI.Box data-testid="no-state-data">
        <QMR.Notification
          alertStatus="warning"
          alertTitle="Data is currently loading or not found"
        />
      </CUI.Box>
    );
  }

  const formattedTableItems = formatTableItems({
    items: data.Items,
    handleDelete,
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

/*

Can you tell me about a feature or project you built yourself? What was the problem you were solving? What tools did you choose for the job and why?

Would you consider yourself opinionated about any particular development pattern or tool? Which ones and why?

is there ay cool new tech that you are using these days?

approach to testing 

backend testing frameworks have you used in the past

microservices / monorepo - what information might you need to determine the best approach for a solution?

whats your experience been with DynamoDB - do you prefer working with relational databases?

do you have any experience working with typescript / serverless?

we have a dynamoDB with the results of user entered data for all 50 states by year for a set of standardized questions. We want to provide this data to a third party so they can do fancy vizualisations to it. What are some various ways we could provide this data to the third party who is not within our aws account?

How do you deal with inefficient coding turned in by your team colleague?

lets assume we start a game of chess, you are white, what opening are you going with?

*/
