import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useFormContext } from "react-hook-form";
import { FormData } from "../types";
import { WhyAreYouNotReporting } from "shared/commonQuestions/WhyAreYouNotReporting";

interface Props {
  reportingYear: string;
  healthHomeMeasure?: boolean;
  removeLessThan30?: boolean;
}

export const Reporting = ({
  reportingYear,
  healthHomeMeasure,
  removeLessThan30,
}: Props) => {
  const register = useCustomRegister<FormData>();
  const { watch } = useFormContext<FormData>();
  const watchRadioStatus = watch("DidCollect");

  return (
    <>
      <QMR.CoreQuestionWrapper
        testid="reporting"
        label="Did you collect this measure?"
      >
        <QMR.RadioButton
          {...register("DidCollect")}
          options={[
            {
              displayValue: `Yes, we did collect data for Medical Assistance with Smoking and Tobacco Use Cessation (MSC-AD) for FFY ${reportingYear} quality measure reporting.`,
              value: "yes",
            },
            {
              displayValue: `No, we did not collect data for Medical Assistance with Smoking and Tobacco Use Cessation (MSC-AD) for FFY ${reportingYear} quality measure reporting.`,
              value: "no",
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus?.includes("no") && (
        <WhyAreYouNotReporting
          healthHomeMeasure={healthHomeMeasure}
          removeLessThan30={removeLessThan30}
        />
      )}
    </>
  );
};
