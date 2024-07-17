import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";
import * as DC from "dataConstants";
import { WhyAreYouNotReporting } from "shared/commonQuestions/WhyAreYouNotReporting";
import { useFormContext } from "react-hook-form";
import * as Types from "../types";

interface Props {
  reportingYear: string;
  healthHomeMeasure?: boolean;
  removeLessThan30?: boolean;
}

export const HowDidYouReport = ({
  healthHomeMeasure,
  removeLessThan30,
  reportingYear,
}: Props) => {
  const register = useCustomRegister<FormData>();
  const { watch } = useFormContext<Types.FormData>();
  const watchRadioStatus = watch(DC.DID_REPORT);

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
        {...register("HowDidYouReport")}
        options={[
          {
            displayValue: `Yes, we submitted our CAHPS survey data to the AHRQ CAHPS Database during the June ${reportingYear} submission period.`,
            value: DC.YES,
            children: [
              <QMR.CoreQuestionWrapper testid="did-report" label="">
                <QMR.RadioButton
                  {...register(DC.DID_REPORT)}
                  label={`Would you like to enter data for this measure in the QMR system for FFY ${reportingYear} reporting?`}
                  options={[
                    {
                      displayValue: `Yes, I would like to enter data for this measure in the QMR system for FFY ${reportingYear} reporting.`,
                      value: DC.YES,
                    },
                    {
                      displayValue: `No, I would not like to enter data for this measure in the QMR system for FFY ${reportingYear} reporting.`,
                      value: DC.NO,
                    },
                  ]}
                />
                {watchRadioStatus === DC.NO && (
                  <WhyAreYouNotReporting
                    healthHomeMeasure={healthHomeMeasure}
                    removeLessThan30={removeLessThan30}
                  />
                )}
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
