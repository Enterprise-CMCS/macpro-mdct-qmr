import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "measures/types";

export const DateRange = () => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="Date Range">
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
          available in the Measurement Period Table resource.
        </CUI.Text>
      </CUI.Stack>
      <QMR.DateRange {...register("DateRange")} />
    </QMR.CoreQuestionWrapper>
  );
};
