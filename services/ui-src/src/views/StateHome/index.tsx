import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { measuresList } from "measures/measuresList";
import { useParams, useNavigate } from "react-router-dom";
import { Params } from "Routes";
import { CoreSet } from "components/Table/types";
import { coreSetActions } from "./actions";
import { AddCoreSetCards } from "./AddCoreSetCards";
import { TiArrowUnsorted } from "react-icons/ti";

// This will be updated when we know exactly what we need to add coreset
const data: CoreSet.Data[] = [
  {
    path: "ACS",
    title: "Adult Core Set Measures",
    type: CoreSet.Type.ADULT,
    progress: { numAvailable: 12, numComplete: 0 },
    actions: coreSetActions[CoreSet.Type.ADULT]("OH2021-ACS"),
    submitted: false,
    id: "OH2021-ACS",
    year: "2021",
  },
  {
    path: "CCS",
    title: "Child Core Set Measures",
    type: CoreSet.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 2 },
    actions: coreSetActions[CoreSet.Type.CHILD]("OH2021-CCS"),
    submitted: false,
    id: "OH2021-CCS",
    year: "2021",
  },
  {
    path: "CCSM",
    title: "Medicaid Child Core Set Measures",
    type: CoreSet.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 3 },
    actions: coreSetActions[CoreSet.Type.CHILD]("OH2021-CCSM"),
    submitted: false,
    id: "OH2021-CCSM",
    year: "2021",
  },
  {
    path: "CCSC",
    title: "Child Core Set Measures: CHIP",
    type: CoreSet.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 11 },
    actions: coreSetActions[CoreSet.Type.CHILD]("OH2021-CCSC"),
    submitted: false,
    id: "OH2021-CCSC",
    year: "2021",
  },
  {
    path: "HHCS",
    title: "Health Home Set Measures",
    type: CoreSet.Type.HEALTH_HOMES,
    progress: { numAvailable: 12, numComplete: 5 },
    actions: coreSetActions[CoreSet.Type.HEALTH_HOMES]("OH2021-HHCS"),
    submitted: false,
    id: "OH2021-HHCS",
    year: "2021",
  },
];

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
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: "Core Set Measures" },
      ]}
    >
      <Heading />
      <QMR.Table data={data} columns={QMR.coreSetColumns} />
      <CUI.HStack spacing="6">
        <AddCoreSetCards />
      </CUI.HStack>
    </QMR.StateLayout>
  );
};
