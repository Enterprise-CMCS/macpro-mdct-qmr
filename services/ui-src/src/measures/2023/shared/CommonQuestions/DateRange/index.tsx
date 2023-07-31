import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import * as DC from "dataConstants";

const measurementPeriodTableLinks = {
  adult:
    "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-and-child-health-care-quality-measures/adult-core-set-reporting-resources/index.html",
  child:
    "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-and-child-health-care-quality-measures/child-core-set-reporting-resources/index.html",
  health:
    "https://www.medicaid.gov/state-resource-center/medicaid-state-technical-assistance/health-home-information-resource-center/quality-reporting/index.html",
};

interface Props {
  type: "adult" | "child" | "health";
}

const subTextElement = (link: string) => {
  return (
    <CUI.Text mt="2" mb="2">
      Information for each measure is available in the{" "}
      <CUI.Link href={link} color="blue" isExternal>
        Measurement Period Table
      </CUI.Link>{" "}
      resource.
    </CUI.Text>
  );
};

export const DateRange = ({ type }: Props) => {
  const register = useCustomRegister<Types.DateRange>();
  const link = measurementPeriodTableLinks[type];

  return (
    <QMR.CoreQuestionWrapper testid="date-range" label="Date Range">
      <QMR.RadioButton
        formLabelProps={{ fontWeight: "bold" }}
        label="Did your state adhere to Core Set specifications in defining the measurement period for calculating this measure?"
        {...register(DC.MEASUREMENT_PERIOD_CORE_SET)}
        subTextElement={subTextElement(link)}
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
              <>
                <CUI.Stack spacing={4} mb="4">
                  <CUI.Text>
                    For all measures, states should report start and end dates
                    to calculate the denominator. For some measures, the
                    specifications require a “look-back period” before or after
                    the measurement period to determine eligibility or
                    utilization. The measurement period entered in the Start and
                    End Date fields should not include the “look-back period.”
                  </CUI.Text>
                </CUI.Stack>

                <QMR.DateRange {...register(DC.DATE_RANGE)} />
              </>,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
