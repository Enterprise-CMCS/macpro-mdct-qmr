import * as QMR from "components";
interface Props {
  name: string;
  year: string;
}

export const CPAAD = ({ name, year }: Props) => {
  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      measureTitle={`CAP-AD - ${name}`}
      performanceMeasureText="This measure provides information on the experiences of beneficiaries with their health care and gives a general indication of how well the health care meets the beneficiaries’ expectations. Results summarize beneficiaries’ experiences through ratings, composites, and question summary rates."
    />
  );
};
