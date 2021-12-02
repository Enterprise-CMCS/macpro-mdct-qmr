import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs/RadioButton";
import { useFormContext } from "react-hook-form";

interface Props {
  options: QMR.RadioButtonOption[];
  value?: string;
  onChange: (v: string) => void;
}

export const AreYouReporting = ({ options }: Props) => {
  const { watch, register } = useFormContext();
  const watchAreYouReportingRadioButton = watch("areYouReportingRadioButton");
  return (
    <CoreQuestionWrapper label="Are you reporting on this measure?">
      <QMR.RadioButton
        {...register("areYouReportingRadioButton")}
        value={watchAreYouReportingRadioButton}
        options={options}
      />
    </CoreQuestionWrapper>
  );
};
