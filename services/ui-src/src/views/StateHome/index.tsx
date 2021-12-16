import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import config from "config";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Params } from "Routes";
import { CoreSet } from "components/Table/types";
import { coreSetActions } from "./actions";
import { AddCoreSetCards } from "./AddCoreSetCards";

// This will be updated when we know exactly what we need to add coreset
const data: CoreSet.Data[] = [
  {
    path: "/adult",
    title: "Adult Core Set Measures",
    type: CoreSet.Type.ADULT,
    progress: { numAvailable: 12, numComplete: 0 },
    actions: coreSetActions[CoreSet.Type.ADULT]("test1"),
    submitted: false,
    id: "test1",
    year: "2021",
  },
];

const ReportingYear = () => {
  const reportingyearOptions = config.reportingYears.map((year: string) => ({
    displayValue: year + " Core Set",
    value: year,
  }));

  return (
    <form>
      <CUI.Box w={{ base: "full", md: "48" }}>
        <CUI.Text fontSize="sm" fontWeight="600" mb="2">
          Reporting Year
        </CUI.Text>
        <QMR.Select
          name="reporting-year"
          options={reportingyearOptions}
          selectProps={{
            onChange: (e) => console.log(e.target.value),
          }}
        />
      </CUI.Box>
    </form>
  );
};

const Heading = () => {
  return (
    <CUI.Box display={{ base: "block", md: "flex" }}>
      <CUI.Box maxW="3xl" pb="6">
        <CUI.Heading size="lg">
          FFY 2021 Core Set Measures Reporting
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
  const methods = useForm();
  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
};
