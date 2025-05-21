import * as QMR from "components";

interface Props {
  name: string;
  year: string;
}

export const LRCDCH = ({ name, year }: Props) => {
  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      measureTitle={`LRCD-CH - ${name}`}
      performanceMeasureText="Percentage of nulliparous (first birth), term (37 or more completed weeks based on the obstetric estimate), singleton (one fetus), in a cephalic presentation (head-first) births to mothers under age 20 delivered by cesarean during the measurement year."
      performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate
      this measure for states using state natality data obtained through
      the Centers for Disease Control and Prevention Wide-ranging Online
      Data for Epidemiologic Research (CDC WONDER)."
    />
  );
};
