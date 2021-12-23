import * as CUI from "@chakra-ui/react";
import { Measure } from "measures/types";
import * as QMR from "components";

export const PDENTCH = ({ name, year }: Measure.Props) => {
  return (
    <>
      <CUI.HStack justifyContent="space-between">
        <CUI.Text fontSize="xl" fontWeight="700">
          Measure Details
        </CUI.Text>
        <QMR.ContainedButton
          buttonProps={{
            paddingX: "12",
            variant: "outline",
            colorScheme: "blue",
          }}
          icon="print"
          buttonText="Print"
          onClick={() => window.print()}
        />
      </CUI.HStack>

      <CUI.Stack spacing={8}>
        <CUI.Box>
          <CUI.Text fontWeight="700">Measure Title</CUI.Text>
          <CUI.Text>{name}</CUI.Text>
        </CUI.Box>

        <CUI.Box>
          <CUI.Text fontWeight="700">Date Completed</CUI.Text>
          <CUI.Text>Auto-completed on Sep 30, 2021 12:01 AM EST</CUI.Text>
        </CUI.Box>

        <CUI.Box>
          <CUI.Text fontWeight="700">{`Reporting on Measure FFY ${year}`}</CUI.Text>
          <CUI.Text>Yes</CUI.Text>
        </CUI.Box>

        <CUI.Stack spacing={6}>
          <CUI.Box>
            <CUI.Text fontWeight="700">Performance Measure</CUI.Text>
            <CUI.Text>
              The National Core Indicators® (NCI®) provide information on
              beneficiaries’ experience and self-reported outcomes of long-term
              services and supports of individuals with intellectual and/or
              developmental disabilities (I/DD) and their families. NCI includes
              an in-person survey, family surveys for parents and guardians of
              adults and children who receive I/DD supports, and a staff
              stability survey. For the purpose of the Adult Core Set, only data
              from the NCI in-person survey will be reported.
            </CUI.Text>
          </CUI.Box>

          <CUI.Text>
            To reduce state burden and streamline reporting, CMS will calculate
            this measure for states using state natality data obtained through
            the Centers for Disease Control and Prevention Wide-ranging Online
            Data for Epidemiologic Research (CDC WONDER).
          </CUI.Text>
          <CUI.Text fontWeight="700">
            States are not asked to report data for this measure for FFY 2021
            Core Set reporting.
          </CUI.Text>
        </CUI.Stack>

        <QMR.ContainedButton
          buttonProps={{ colorScheme: "blue", variant: "outline" }}
          buttonText="Back to Core Set Measures"
        />
      </CUI.Stack>
    </>
  );
};
