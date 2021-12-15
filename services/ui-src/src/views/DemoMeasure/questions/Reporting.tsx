import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useFormContext } from "react-hook-form";
import { DemoForm } from "views/DemoMeasure/DemoFormType";
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
  const register = useCustomRegister<DemoForm.DemoFormType>();
  const { watch } = useFormContext<DemoForm.DemoFormType>();
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
