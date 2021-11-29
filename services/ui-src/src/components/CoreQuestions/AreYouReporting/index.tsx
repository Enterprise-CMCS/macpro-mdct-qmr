import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs/RadioButton";

interface Props {
  options: QMR.RadioButtonOption[];
  value?: string;
  onChange: any;
}

export const AreYouReporting = ({ options, onChange, value = "" }: Props) => {
  console.log({ value });
  return (
    <CoreQuestionWrapper label="1. Are you reporting">
      <QMR.RadioButton
        onChange={(v) => {
          console.log(v);
          onChange("1", v);
        }}
        value={value}
        options={options}
      />
    </CoreQuestionWrapper>
  );
};
