import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs";

interface Props {
  options: QMR.RadioButtonOption[];
  value?: string;
  onChange: (v: string) => void;
}

export const StatusOfDataReported = ({
  options,
  onChange,
  value = "",
}: Props) => {
  return (
    <CoreQuestionWrapper label="2. Status of Data Reported">
      <QMR.RadioButton
        onChange={onChange}
        value={value}
        options={options}
      ></QMR.RadioButton>
    </CoreQuestionWrapper>
  );
};
