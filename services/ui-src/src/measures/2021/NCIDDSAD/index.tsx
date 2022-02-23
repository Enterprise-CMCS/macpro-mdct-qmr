import * as QMR from "components";

interface Props {
  name: string;
  year: string;
}

export const NCIDDSAD = ({ name, year }: Props) => {
  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      measureTitle={`NCIDDS-AD - ${name}`}
      performanceMeasureText="The National Core Indicators® (NCI®) provide information on
        beneficiaries’ experience and self-reported outcomes of long-term
        services and supports of individuals with intellectual and/or
        developmental disabilities (I/DD) and their families. NCI includes
        an in-person survey, family surveys for parents and guardians of
        adults and children who receive I/DD supports, and a staff
        stability survey. For the purpose of the Adult Core Set, only data
        from the NCI in-person survey will be reported."
      performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate this measure for states using data that states submitted to NASDDDS/HSRI (the NCI National Team) through the Online Data Entry System (ODESA). CMS will work with the NCI National Team to obtain data for all states that gave permission for data to be released to CMS for the purpose of Adult Core Set reporting."
    />
  );
};
