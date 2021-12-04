import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs/RadioButton";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoQuestions/DemoFormType";
import { useFormContext } from "react-hook-form";

interface Props {
  options: QMR.RadioButtonOption[];
}

export const AreYouReporting = ({ options }: Props) => {
  const {
    formState: { errors },
  } = useFormContext<DemoForm.DemoFormType>();
  return (
    <CoreQuestionWrapper label="Are you reporting on this measure?">
      <QMR.RadioButton
        {...useCustomRegister<DemoForm.DemoFormType>("areYouReporting")}
        isInvalid={!!errors.areYouReporting}
        errorMessage={errors.areYouReporting?.message}
        options={options}
      />
    </CoreQuestionWrapper>
  );
};
