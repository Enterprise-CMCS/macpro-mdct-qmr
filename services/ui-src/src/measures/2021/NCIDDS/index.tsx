import * as CUI from "@chakra-ui/react";
import { Measure } from "measures/types";
import * as QMR from "components";

// This is where we will put the measures - the exported comp should be named as the measureId (without the trailing '-XX' )
// All the measures defined in this directory will have all the props from the MeasureWrapper passed into it
export const NCIDDS = ({ name, year }: Measure.Props) => {
  return (
    <>
      <CUI.HStack justifyContent="space-between">
        <CUI.Text fontSize="xl" fontWeight="700">
          Measure Details
        </CUI.Text>
        <QMR.ContainedButton icon="print" buttonText="Print" />
      </CUI.HStack>
      <CUI.VStack>
        <CUI.Text>Measure Title</CUI.Text>
        <CUI.Text>{name}</CUI.Text>
      </CUI.VStack>

      <CUI.VStack>
        <CUI.Text>Date Completed</CUI.Text>
        <CUI.Text>Auto-completed on Sep 30, 2021 12:01 AM EST</CUI.Text>
      </CUI.VStack>

      <CUI.VStack>
        <CUI.Text>{`Reporting on Measure FFY ${year}`}</CUI.Text>
        <CUI.Text>Yes</CUI.Text>
      </CUI.VStack>

      <CUI.VStack>
        <CUI.Text>Performance Measure</CUI.Text>
        <CUI.Text>
          The National Core Indicators® (NCI®) provide information on
          beneficiaries’ experience and self-reported outcomes of long-term
          services and supports of individuals with intellectual and/or
          developmental disabilities (I/DD) and their families. NCI includes an
          in-person survey, family surveys for parents and guardians of adults
          and children who receive I/DD supports, and a staff stability survey.
          For the purpose of the Adult Core Set, only data from the NCI
          in-person survey will be reported. To reduce state burden and
          streamline reporting, CMS will calculate this measure for states using
          state natality data obtained through the Centers for Disease Control
          and Prevention Wide-ranging Online Data for Epidemiologic Research
          (CDC WONDER).
        </CUI.Text>
        <CUI.Text fontWeight="700">
          States are not asked to report data for this measure for FFY 2021 Core
          Set reporting.
        </CUI.Text>
      </CUI.VStack>
      <QMR.ContainedButton
        buttonProps={{ colorScheme: "blue", variant: "outline" }}
        buttonText="Back to Core Set Measures"
      />
    </>
  );
};
