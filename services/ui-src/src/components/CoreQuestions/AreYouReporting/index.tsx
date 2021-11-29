import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs/RadioButton";

interface Props {
  options: QMR.RadioButtonOption[];
  value?: string;
  onChange: (v: string) => void;
}

export const AreYouReporting = ({ options, onChange, value = "" }: Props) => {
  return (
    <CoreQuestionWrapper label="1. Are you reporting">
      <QMR.RadioButton onChange={onChange} value={value} options={options} />
    </CoreQuestionWrapper>
  );
};
