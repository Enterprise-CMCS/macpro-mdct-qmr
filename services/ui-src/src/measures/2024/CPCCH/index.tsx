import * as QMR from "components";

interface Props {
  name: string;
  year: string;
}

export const CPCCH = ({ name, year }: Props) => {
  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      measureTitle={`CPC-CH - ${name}`}
      performanceMeasureText="The measure provides information on parents' experiences with their child's health care. Results summarize children's experiences through ratings, composites, and individual question summary rates."
      performanceMeasureSubtext={[
        "The Children with Chronic Conditions Supplemental Items provides information on parents' experience with their child's health care for the population of children with chronic conditions. ",
        "To reduce state burden and streamline reporting, CMS will calculate state-level performance results for this measure using data submitted to the AHRQ CAHPS Health Plan Survey Database.",
      ]}
    />
  );
};
