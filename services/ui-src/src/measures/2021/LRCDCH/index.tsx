import { Measure } from "measures/types";
import * as QMR from "components";

export const LRCDCH = ({ name, year }: Measure.Props) => {
  return (
    <QMR.AutoCompletedMeasureTemplate
      year={year}
      dateCompleted="Sep 30, 2021 12:01 AM EST"
      reportingOnMeasureYear={true}
      measureTitle={`LRCD-CH - ${name}`}
      performanceMeasureText="Percentage of nulliparous (first birth), term (37 or more completed weeks based on the obstetric estimate), singleton (one fetus), in a cephalic presentation (head-first) births delivered by cesarean during the measurement year."
      performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate
      this measure for states using state natality data obtained through
      the Centers for Disease Control and Prevention Wide-ranging Online
      Data for Epidemiologic Research (CDC WONDER)."
    />
  );
};
