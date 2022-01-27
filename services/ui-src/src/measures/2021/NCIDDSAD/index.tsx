import { Measure } from "measures/types";
import * as QMR from "components";
import { useGetMeasure } from "hooks/api";
import { CoreSetAbbr } from "types";

export const NCIDDSAD = ({ name, year }: Measure.Props) => {
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.ACS,
    measure: "NCIDDS-AD",
  });

  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      dateCompleted={new Date(data.Item?.createdAt).toString()}
      isReportingOnMeasureYear={true}
      measureTitle={`NCIDDS-AD - ${name}`}
      performanceMeasureText="The National Core Indicators® (NCI®) provide information on
        beneficiaries’ experience and self-reported outcomes of long-term
        services and supports of individuals with intellectual and/or
        developmental disabilities (I/DD) and their families. NCI includes
        an in-person survey, family surveys for parents and guardians of
        adults and children who receive I/DD supports, and a staff
        stability survey. For the purpose of the Adult Core Set, only data
        from the NCI in-person survey will be reported."
      performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate
        this measure for states using state natality data obtained through
        the Centers for Disease Control and Prevention Wide-ranging Online
        Data for Epidemiologic Research (CDC WONDER)."
    />
  );
};
