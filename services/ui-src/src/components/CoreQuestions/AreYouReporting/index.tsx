import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs/RadioButton";

// interface SampleStructure {
//   questionId: number;
//   questionLabel?: string;
//   questionValue: any;
// }

export const AreYouReporting = () => {
  return (
    <CoreQuestionWrapper label="1. Are you reporting">
      <QMR.RadioButton
        onChange={() => {}}
        value=""
        options={[
          {
            displayValue: "testing",
            value: "testing",
          },
        ]}
      />
    </CoreQuestionWrapper>
  );
};
