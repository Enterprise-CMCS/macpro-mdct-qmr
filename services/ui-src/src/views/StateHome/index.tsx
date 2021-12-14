import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Params } from "Routes";
import { CoreSet } from "components/Table/types";

const cardData = [
  {
    title: "Need to report on Child data?",
    buttonText: "Add Child Core Set",
    to: `/add-child`,
  },
  {
    title: "Need to report on Health homes data?",
    buttonText: "Add Health Homes Core Set",
    to: `/add-hh`,
  },
];

const data: CoreSet.Data[] = [
  {
    path: "/adult",
    title: "Adult Core Set Measures",
    type: CoreSet.Type.ADULT,
    progress: { numAvailable: 12, numComplete: 0 },
    actions: [
      {
        itemText: "Export",
        id: "1234567",
        handleSelect: (id) => console.log(id),
      },
    ],
    submitted: false,
    id: "test1",
    year: "2021",
  },
];

const ReportingYear = () => {
  return (
    <form>
      <CUI.Box w={{ base: "full", md: "48" }}>
        <CUI.Text fontSize="sm" fontWeight="600" mb="2">
          Reporting Year
        </CUI.Text>
        <QMR.Select
          name="reporting-year"
          options={[
            { displayValue: "2021 Core Set", value: "2021" },
            { displayValue: "2022 Core Set", value: "2022" },
          ]}
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
    <CUI.Box display={{ base: "block", md: "flex" }} mb="4">
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

interface AddCoreSetCardProps {
  title: string;
  buttonText: string;
  to: string;
}

const AddCoreSetCard = ({ title, buttonText, to }: AddCoreSetCardProps) => {
  const { state, year } = useParams<Params>();

  return (
    <CUI.Box
      as="aside"
      borderRadius="base"
      borderWidth="thin"
      borderLeftWidth="14px"
      borderLeftColor="blue.500"
      minW="363px"
      p="6"
    >
      <CUI.Stack spacing="6">
        <CUI.Text fontWeight="bold">{title}</CUI.Text>
        <Link
          to={`/${state}/${year}/${to}`}
          style={{
            textDecoration: "none",
          }}
        >
          <QMR.ContainedButton
            icon="plus"
            buttonText={buttonText}
            buttonProps={{
              colorScheme: "blue",
              textTransform: "capitalize",
              variant: "outline",
            }}
          />
        </Link>
      </CUI.Stack>
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
          {cardData.map((d) => (
            <AddCoreSetCard {...d} />
          ))}
        </CUI.HStack>

        <CUI.Stack spacing="4" data-testid="state-home" mt="6">
          <Link to={`/components`}>Demo Components</Link>
          <Link to={`/OH/2021/ACS/AIF-HH`}>Demo Questions</Link>
        </CUI.Stack>
      </QMR.StateLayout>
    </FormProvider>
  );
};
