import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoMeasure/DemoFormType";

export const Reporting = () => {
  return (
    <QMR.CoreQuestionWrapper label="Are you reporting on this measure?">
      <QMR.RadioButton
        {...useCustomRegister<DemoForm.DemoFormType>("areYouReporting")}
        options={[
          {
            displayValue: `Yes, I am reporting Admission to an Institution from the Community (AIF-HH) for FFY 2021 quality params.measure reporting.`,
            value: "Yes, I am reporting",
          },
          {
            displayValue: `No, I am not reporting Admission to an Institution from the Community (AIF-HH) for FFY 2021 quality measure reporting.`,
            value: "No, I am not reporting",
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
