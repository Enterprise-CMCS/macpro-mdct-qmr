import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "measures/types";
import { useFormContext } from "react-hook-form";
import { WhyAreYouNotReporting } from ".";

interface Props {
  measureName: string;
  measureAbbreviation: string;
  reportingYear: number;
}

export const Reporting = ({
  measureName,
  reportingYear,
  measureAbbreviation,
}: Props) => {
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
              displayValue: `Yes, I am reporting ${measureName} (${measureAbbreviation}) for FFY ${reportingYear} quality measure reporting.`,
              value: "Yes, I am reporting",
            },
            {
              displayValue: `No, I am not reporting ${measureName} (${measureAbbreviation}) for FFY ${reportingYear} quality measure reporting.`,
              value: "No, I am not reporting",
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus?.includes("No,") && <WhyAreYouNotReporting />}
    </>
  );
};
