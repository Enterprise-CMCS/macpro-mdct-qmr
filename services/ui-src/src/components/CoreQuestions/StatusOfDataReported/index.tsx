import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs";
import { useCustomRegister } from "hooks/useCustomRegister";

interface Props {
  options: QMR.RadioButtonOption[];
}

export const StatusOfDataReported = ({ options }: Props) => {
  return (
    <CoreQuestionWrapper label="Status of Data Reported">
      <QMR.RadioButton
        {...useCustomRegister("statusOfDataReporting.statusOfDataReporting")}
        options={options}
      />
    </CoreQuestionWrapper>
  );
};
