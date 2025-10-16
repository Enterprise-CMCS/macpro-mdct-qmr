import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as DC from "dataConstants";

export const HowDidYouReport = () => {
  return (
    <QMR.CoreQuestionWrapper label="Did you submit your CAHPS survey data to the AHRQ CAHPS Database during the June 2025 submission period?">
      <CUI.Text py="3">
        Note: States that reported this measure in the AHRQ CAHPS Database will
        have the opportunity to preview the results in the spring.
      </CUI.Text>
      <QMR.RadioButton
        key={DC.HOW_DID_YOU_REPORT}
        name={DC.HOW_DID_YOU_REPORT}
        options={[
          {
            displayValue:
              "Yes, we submitted our CAHPS survey data to the AHRQ CAHPS Database during the June 2025 submission period.",
            value:
              "Yes, we submitted our CAHPS survey data to the AHRQ CAHPS Database during the June 2025 submission period.",
          },
          {
            displayValue:
              "No, we did not submit our CAHPS survey data to the AHRQ CAHPS Database during the June 2025 submission period.",
            value:
              "No, we did not submit our CAHPS survey data to the AHRQ CAHPS Database during the June 2025 submission period.",
          },
        ]}
        formLabelProps={{ fontWeight: "bold" }}
      />
    </QMR.CoreQuestionWrapper>
  );
};
