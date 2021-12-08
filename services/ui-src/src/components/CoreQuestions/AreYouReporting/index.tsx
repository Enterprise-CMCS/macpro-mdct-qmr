import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs/RadioButton";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoQuestions/DemoFormType";

interface Props {
  options: QMR.RadioButtonOption[];
}

export const AreYouReporting = ({ options }: Props) => {
  return (
    <CoreQuestionWrapper label="Are you reporting on this measure?">
      <QMR.RadioButton
        {...useCustomRegister<DemoForm.DemoFormType>("areYouReporting")}
        options={options}
      />
    </CoreQuestionWrapper>
  );
};
