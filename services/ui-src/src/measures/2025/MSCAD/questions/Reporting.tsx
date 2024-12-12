import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useFormContext } from "react-hook-form";
import * as DC from "dataConstants";
import { FormData } from "../types";
import { WhyAreYouNotReporting } from "shared/commonQuestions/WhyAreYouNotReporting";

interface Props {
  reportingYear: string;
}

export const Reporting = ({ reportingYear }: Props) => {
  const register = useCustomRegister<FormData>();
  const { watch } = useFormContext<FormData>();
  const watchRadioStatus = watch(DC.DID_COLLECT);

  return (
    <>
      <QMR.CoreQuestionWrapper
        testid="reporting"
        label="Did you collect this measure?"
      >
        <QMR.RadioButton
          {...register(DC.DID_COLLECT)}
          options={[
            {
              displayValue: `Yes, we did collect data for Medical Assistance with Smoking and Tobacco Use Cessation (MSC-AD) for ${reportingYear} quality measure reporting.`,
              value: DC.YES,
            },
            {
              displayValue: `No, we did not collect data for Medical Assistance with Smoking and Tobacco Use Cessation (MSC-AD) for ${reportingYear} quality measure reporting.`,
              value: DC.NO,
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus === DC.NO && <WhyAreYouNotReporting />}
    </>
  );
};
