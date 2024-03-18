import * as QMR from "components";
interface Props {
  name: string;
  year: string;
}

export const CPAAD = ({ name, year }: Props) => {
  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      measureTitle={`CPA-AD - ${name}`}
      performanceMeasureText="This measure provides information on the experiences of beneficiaries with their health care and gives a general indication of how well the health care meets the beneficiaries’ expectations. Results summarize beneficiaries’ experiences through ratings, composites, and question summary rates."
      performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate state-level performance results for this measure using data submitted for the state to the AHRQ CAHPS Health Plan Survey Database."
    />
  );
};
