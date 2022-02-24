import * as QMR from "components";

interface Props {
  name: string;
  year: string;
}

export const PDENTCH = ({ name, year }: Props) => {
  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      measureTitle={`PDENT-CH - ${name}`}
      performanceMeasureText="To reduce state burden and streamline reporting, CMS will use data from each state’s annual EPSDT report (Form CMS-416)."
    />
  );
};
