import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import { useFormContext } from "react-hook-form";
import { WhyAreYouNotReporting } from "../WhyAreYouNotReporting";

interface Props {
  measureName: string;
  measureAbbreviation: string;
  reportingYear: string;
}

export const Reporting = ({
  measureName,
  reportingYear,
  measureAbbreviation,
}: Props) => {
  const register = useCustomRegister<Types.DidReport>();
  const { watch } = useFormContext<Types.DidReport>();
  const watchRadioStatus = watch("DidReport");

  return (
    <>
      <QMR.CoreQuestionWrapper label="Are you reporting on this measure?">
        <QMR.RadioButton
          {...register("DidReport")}
          options={[
            {
              displayValue: `Yes, I am reporting ${measureName} (${measureAbbreviation}) for FFY ${reportingYear} quality measure reporting.`,
              value: "yes",
            },
            {
              displayValue: `No, I am not reporting ${measureName} (${measureAbbreviation}) for FFY ${reportingYear} quality measure reporting.`,
              value: "no",
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus?.includes("No,") && <WhyAreYouNotReporting />}
    </>
  );
};
