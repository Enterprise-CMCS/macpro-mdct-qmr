import * as QMR from "components";
import * as DC from "dataConstants";

export const HowDidYouReport = () => {
  return (
    <QMR.CoreQuestionWrapper
      testid="how-did-you-report"
      label="How did you report this measure?"
    >
      <QMR.RadioButton
        key={DC.HOW_DID_YOU_REPORT}
        name={DC.HOW_DID_YOU_REPORT}
        options={[
          {
            displayValue: "Submitted raw data to AHRQ (CAHPS Database)",
            value: "Submitted raw data to AHRQ (CAHPS Database)",
          },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                key={DC.HOW_DID_YOU_REPORT_EXPLANATION}
                name={DC.HOW_DID_YOU_REPORT_EXPLANATION}
                label="Explain"
                formLabelProps={{
                  fontWeight: "normal",
                  fontSize: "normal",
                }}
              />,
            ],
          },
        ]}
        formLabelProps={{ fontWeight: "bold" }}
      />
    </QMR.CoreQuestionWrapper>
  );
};
