import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";

interface Props {
  reportingYear: string;
}

export const HowDidYouReport = ({ reportingYear }: Props) => {
  return (
    <QMR.CoreQuestionWrapper
      testid="how-did-you-report"
      label={`Did you submit your CAHPS survey data to the AHRQ CAHPS Database during the June ${reportingYear} submission period?`}
    >
      <CUI.Text mt="3" pb="3">
        Note: States that reported this measure in the AHRQ CAHPS Database will
        have the opportunity to preview the results in the spring.
      </CUI.Text>
      <QMR.RadioButton
        key={DC.HOW_DID_YOU_REPORT}
        name={DC.HOW_DID_YOU_REPORT}
        options={[
          {
            displayValue: `Yes, we submitted our CAHPS survey data to the AHRQ CAHPS Database during the June ${reportingYear} submission period.`,
            value: DC.YES,
            children: [
              <QMR.CoreQuestionWrapper
                key="did-report-wrapper-2025"
                testid="did-report"
                label=""
              >
                <QMR.RadioButton
                  key={DC.DID_REPORT}
                  name={DC.DID_REPORT}
                  label={`Would you like to enter data for this measure in the QMR system for ${reportingYear} reporting?`}
                  options={[
                    {
                      displayValue: `Yes, I would like to enter data for this measure in the QMR system for ${reportingYear} reporting.`,
                      value: DC.YES,
                    },
                    {
                      displayValue: `No, I would not like to enter data for this measure in the QMR system for ${reportingYear} reporting.`,
                      value: DC.NO,
                    },
                  ]}
                />
              </QMR.CoreQuestionWrapper>,
            ],
          },
          {
            displayValue: `No, we did not submit our CAHPS survey data to the AHRQ CAHPS Database during the June ${reportingYear} submission period.`,
            value: DC.NO,
          },
        ]}
        formLabelProps={{ fontWeight: "bold" }}
      />
    </QMR.CoreQuestionWrapper>
  );
};
