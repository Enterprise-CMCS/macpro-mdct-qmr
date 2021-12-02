import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs/RadioButton";
import { useFormContext } from "react-hook-form";

interface Props {
  options: QMR.RadioButtonOption[];
  value?: string;
  onChange: (v: string) => void;
}

export const AreYouReporting = ({ options }: Props) => {
  const { control } = useFormContext();
  return (
    <CoreQuestionWrapper label="Are you reporting on this measure?">
      <QMR.RadioButton
        control={control}
        name="somethingToTest"
        options={options}
      />
    </CoreQuestionWrapper>
  );
};
