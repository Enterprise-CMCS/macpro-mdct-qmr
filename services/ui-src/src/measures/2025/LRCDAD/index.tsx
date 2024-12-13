import * as QMR from "components";

interface Props {
  name: string;
  year: string;
}

export const LRCDAD = ({ name, year }: Props) => {
  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      measureTitle={`LRCD-AD - ${name}`}
      performanceMeasureText=""
      performanceMeasureSubtext=""
    />
  );
};
