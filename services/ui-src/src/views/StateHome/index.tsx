import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { measuresList } from "measures/measuresList";
import { useParams, useNavigate } from "react-router-dom";
import { Params } from "Routes";
import { AddCoreSetCards } from "./AddCoreSetCards";
import { TiArrowUnsorted } from "react-icons/ti";
import * as Api from "hooks/api";
import { formatTableItems } from "./helpers";
import { CoreSetAbbr } from "types";
import { useQueryClient } from "react-query";

interface Data {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

const ReportingYear = () => {
  const navigate = useNavigate();
  const { state, year } = useParams<Params>();
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
  const { year } = useParams<Params>();
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
  const { state, year } = useParams<Params>();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = Api.useGetCoreSets();
  const deleteCoreSet = Api.useDeleteCoreSet();

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
    return (
      <QMR.Notification alertStatus="error" alertTitle="An Error Occured" />
    );
  }

  if (isLoading || data?.Items.length === 0) {
    // we should have a loading state here
    return null;
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
