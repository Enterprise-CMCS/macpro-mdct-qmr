import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

interface Props {
  name: string;
  year: string;
}

export const LRCDAD = ({ name, year }: Props) => {
  return (
    <>
      <QMR.AutocompletedMeasureTemplate
        year={year}
        measureTitle={`LRCD-AD - ${name}`}
        performanceMeasureText="Percentage of nulliparous (first birth), term (37 or more completed weeks based on the obstetric estimate), singleton (one fetus), in a cephalic presentation (head-first) births to mothers age 20 and older delivered by cesarean during the measurement year."
        performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate
      this measure for states using state natality data obtained through
      the Centers for Disease Control and Prevention Wide-ranging Online
      Data for Epidemiologic Research (CDC WONDER)."
      />
      <CUI.Text
        fontWeight="bold"
        mt={5}
        data-cy="States are asked not to report data for this measure for 2025 Core Set reporting."
      >
        States are asked not to report data for this measure for 2025 Core Set
        reporting.
      </CUI.Text>
    </>
  );
};
