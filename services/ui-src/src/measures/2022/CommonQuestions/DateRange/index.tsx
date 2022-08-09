import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import * as DC from "dataConstants";

const measurementPeriodTableLinks = {
  adult:
    "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-core-set/index.html",
  child:
    "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/child-core-set/index.html",
  health:
    "https://www.medicaid.gov/state-resource-center/medicaid-state-technical-assistance/health-home-information-resource-center/quality-reporting/index.html",
};

interface Props {
  type: "adult" | "child" | "health";
}

export const DateRange = ({ type }: Props) => {
  const register = useCustomRegister<Types.DateRange>();
  const link = measurementPeriodTableLinks[type];

  return (
    <QMR.CoreQuestionWrapper data-testid="date-range" label="Date Range">
      <CUI.Stack spacing={4} mb="4">
        <CUI.Text>
          For all measures, states should report start and end dates to
          calculate the denominator. For some measures, the specifications
          require a “look-back period” before or after the measurement period to
          determine eligibility or utilization. The measurement period entered
          in the Start and End Date fields should not include the “look-back
          period.”
        </CUI.Text>
        <CUI.Text>
          More information about the Start and End Date for each measure is
          available in the{" "}
          <CUI.Link href={link} color="blue" isExternal>
            Measurement Period Table
          </CUI.Link>{" "}
          resource.
        </CUI.Text>
      </CUI.Stack>
      <QMR.DateRange {...register(DC.DATE_RANGE)} />
    </QMR.CoreQuestionWrapper>
  );
};
