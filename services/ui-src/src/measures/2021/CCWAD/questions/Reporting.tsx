import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { useFormContext } from "react-hook-form";
import { WhyAreYouNotReporting } from ".";

export const Reporting = () => {
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
              displayValue: `Yes, I am reporting Contraceptive Care - All Women Ages 21 to 44 (CCW-AD) for FFY 2021 quality measure reporting.`,
              value: "Yes, I am reporting",
            },
            {
              displayValue: `No, I am not reporting Contraceptive Care - All Women Ages 21 to 44 (CCW-AD) for FFY 2021 quality measure reporting.`,
              value: "No, I am not reporting",
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus?.includes("No,") && <WhyAreYouNotReporting />}
    </>
  );
};
