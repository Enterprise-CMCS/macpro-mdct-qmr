import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { useFormContext } from "react-hook-form";
import { WhyAreYouNotReporting } from ".";

interface Props {
  measureName: string;
  measureAbbreviation: string;
  reportingYear: string;
}

export const Reporting = ({ reportingYear }: Props) => {
  const register = useCustomRegister<Measure.Form>();
  const { watch } = useFormContext<Measure.Form>();
  const watchRadioStatus = watch("DidReport");

  return (
    <>
      <QMR.CoreQuestionWrapper label="Are you reporting on this measure?">
        <QMR.RadioButton
          {...register("DidReport")}
          options={[
            {
              displayValue: `Yes, we did collect data for the Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid) (CPA-AD) for ${reportingYear} quality measure reporting.`,
              value: "Yes, we did collect",
            },
            {
              displayValue: `No, we did not collect data for the Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid) (CPA-AD) for ${reportingYear} quality measure reporting.`,
              value: "No, we did not collect",
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus?.includes("No,") && <WhyAreYouNotReporting />}
    </>
  );
};
