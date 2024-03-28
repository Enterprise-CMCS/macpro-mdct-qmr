import * as QMR from "components";

interface Props {
  name: string;
  year: string;
}

export const MSCAD = ({ name, year }: Props) => {
  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      measureTitle={`MSC-AD - ${name}`}
      performanceMeasureText="The following components of this measure assess different facets of providing medical assistance with smoking and tobacco use cessation:"
      performanceMeasureList={[
        "Advising Smokers and Tobacco Users to Quit – A rolling average represents the percentage of beneficiaries age 18 and Older who were current smokers or tobacco users and who received advice to quit during the measurement year.",
        "Discussing Cessation Medications – A rolling average represents the percentage of beneficiaries age 18 and Older who were current smokers or tobacco users and who discussed or were recommended cessation medications during the measurement year",
        "Discussing Cessation Strategies – A rolling average represents the percentage of beneficiaries age 18 and Older who were current smokers or tobacco users and who discussed or were provided cessation methods or strategies during the measurement year",
      ]}
      performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate state-level performance results for this measure using data submitted for the state to the AHRQ CAHPS Health Plan Survey Database."
    />
  );
};
