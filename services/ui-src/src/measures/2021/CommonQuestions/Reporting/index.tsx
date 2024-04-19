import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import * as DC from "dataConstants";
import { useFormContext } from "react-hook-form";
import { WhyAreYouNotReporting } from "shared/commonQuestions/WhyAreYouNotReporting";

interface Props {
  measureName: string;
  measureAbbreviation: string;
  reportingYear: string;
  healthHomeMeasure?: boolean;
  removeLessThan30?: boolean;
}

export const Reporting = ({
  measureName,
  reportingYear,
  measureAbbreviation,
  healthHomeMeasure,
  removeLessThan30,
}: Props) => {
  const register = useCustomRegister<Types.DidReport>();
  const { watch } = useFormContext<Types.DidReport>();
  const watchRadioStatus = watch(DC.DID_REPORT);

  return (
    <>
      <QMR.CoreQuestionWrapper label="Are you reporting on this measure?">
        <QMR.RadioButton
          {...register(DC.DID_REPORT)}
          options={[
            {
              displayValue: `Yes, I am reporting ${measureName} (${measureAbbreviation}) for FFY ${reportingYear} quality measure reporting.`,
              value: DC.YES,
            },
            {
              displayValue: `No, I am not reporting ${measureName} (${measureAbbreviation}) for FFY ${reportingYear} quality measure reporting.`,
              value: DC.NO,
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus === DC.NO && (
        <WhyAreYouNotReporting
          healthHomeMeasure={healthHomeMeasure}
          removeLessThan30={removeLessThan30}
        />
      )}
    </>
  );
};
