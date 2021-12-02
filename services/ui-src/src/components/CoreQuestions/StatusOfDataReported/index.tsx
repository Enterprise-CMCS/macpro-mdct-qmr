import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs";
import { useFormContext } from "react-hook-form";

interface Props {
  options: QMR.RadioButtonOption[];
  value?: string;
  onChange: (v: string) => void;
}

export const StatusOfDataReported = ({ options }: Props) => {
  const { watch, register } = useFormContext();
  const watchStatusOfDataReportedRadioButton = watch(
    "watchStatusOfDataReportedRadioButton"
  );

  return (
    <CoreQuestionWrapper label="Status of Data Reported">
      <QMR.RadioButton
        {...register("watchStatusOfDataReportedRadioButton")}
        value={watchStatusOfDataReportedRadioButton}
        options={options}
      />
    </CoreQuestionWrapper>
  );
};
