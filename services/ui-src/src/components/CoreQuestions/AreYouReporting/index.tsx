import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs/RadioButton";
import { useCustomRegister } from "hooks/useCustomRegister";

interface Props {
  options: QMR.RadioButtonOption[];
}

export const AreYouReporting = ({ options }: Props) => {
  return (
    <CoreQuestionWrapper label="Are you reporting on this measure?">
      <QMR.RadioButton
        {...useCustomRegister("areYouReporting")}
        options={options}
      />
    </CoreQuestionWrapper>
  );
};
