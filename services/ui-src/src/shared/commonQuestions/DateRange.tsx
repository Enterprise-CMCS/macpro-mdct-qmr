import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Types from "../types";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { AnyObject } from "types";
import { featuresByYear } from "utils/featuresByYear";

const measurementPeriodTableLinks = {
  adult:
    "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-and-child-health-care-quality-measures/adult-core-set-reporting-resources/index.html",
  child:
    "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-and-child-health-care-quality-measures/child-core-set-reporting-resources/index.html",
  health:
    "https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/health-home-information-resource-center/health-home-quality-reporting",
};

interface Props {
  type: Types.CoreSetKey;
}

const descriptionElement = (label: AnyObject) => {
  return <CUI.Text>{label.desc}</CUI.Text>;
};

const subTextElement = (label: AnyObject, link: string) => {
  return (
    <CUI.Text mt="2" mb="2">
      {label.link[0]}
      <CUI.Link href={link} color="blue" isExternal>
        <u>{label.link[1]}</u>
      </CUI.Link>
      {label.link[2]}
    </CUI.Text>
  );
};

const StandardDateRangeElement = (label: AnyObject, link: string) => {
  return (
    <>
      <CUI.Stack spacing={4} mb="4">
        {descriptionElement(label)}
        {subTextElement(label, link)}
      </CUI.Stack>
      <QMR.DateRange key={DC.DATE_RANGE} name={DC.DATE_RANGE} />
    </>
  );
};

const RadioDateRangeElement = (label: AnyObject, link: string) => {
  return (
    <QMR.RadioButton
      key={DC.MEASUREMENT_PERIOD_CORE_SET}
      name={DC.MEASUREMENT_PERIOD_CORE_SET}
      formLabelProps={{ fontWeight: "bold" }}
      label="Did your state adhere to Core Set specifications in defining the measurement period for calculating this measure?"
      subTextElement={subTextElement(label, link)}
      options={[
        {
          displayValue:
            "Yes, our state adhered to Core Set specifications in defining the measurement period for calculating this measure.",
          value: DC.YES,
        },
        {
          displayValue: "No, our state used a different measurement period.",
          value: DC.NO,
          children: [
            <CUI.Stack spacing={4} mb="4" key="desc">
              {descriptionElement(label)}
            </CUI.Stack>,
            <QMR.DateRange key={DC.DATE_RANGE} name={DC.DATE_RANGE} />,
          ],
        },
      ]}
    />
  );
};

export const DateRange = ({ type }: Props) => {
  const link = measurementPeriodTableLinks[type];

  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  return (
    <QMR.CoreQuestionWrapper testid="date-range" label="Date Range">
      {featuresByYear.allowImplicitMeasureDates
        ? RadioDateRangeElement(labels.DateRange, link)
        : StandardDateRangeElement(labels.DateRange, link)}
    </QMR.CoreQuestionWrapper>
  );
};
