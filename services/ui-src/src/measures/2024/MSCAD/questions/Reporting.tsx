import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as CUI from "@chakra-ui/react";
import * as Types from "../types";
import * as DC from "dataConstants";
import { useFormContext } from "react-hook-form";
import { WhyAreYouNotReporting } from "shared/commonQuestions/WhyAreYouNotReporting";
import { WhyDidYouNotCollect } from "./WhyDidYouNotCollect";

interface Props {
  measureName: string;
  measureAbbreviation: string;
  reportingYear: string;
  healthHomeMeasure?: boolean;
  removeLessThan30?: boolean;
  isNotReportingData?: boolean;
}

export const Reporting = ({
  healthHomeMeasure,
  removeLessThan30,
  isNotReportingData,
}: Props) => {
  const register = useCustomRegister<Types.FormData>();
  const { watch } = useFormContext<Types.FormData>();
  const watchRadioStatus = watch(DC.DID_REPORT);
  const watchDidCollect = watch("DidCollect");

  return (
    <>
      <QMR.CoreQuestionWrapper
        testid="reporting"
        label="Did you collect this measure?"
      >
        <QMR.RadioButton
          {...register(DC.DID_REPORT)}
          options={[
            {
              displayValue: `Yes, we did collect data for Medical Assistance with Smoking and Tobacco Use Cessation (MSC-AD) for FFY 2024 quality measure reporting.`,
              value: DC.YES,
            },
            {
              displayValue: `No, we did not collect data for Medical Assistance with Smoking and Tobacco Use Cessation (MSC-AD) for FFY 2024 quality measure reporting.`,
              value: DC.NO,
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus === DC.NO && (
        <WhyAreYouNotReporting
          healthHomeMeasure={healthHomeMeasure}
          removeLessThan30={removeLessThan30}
        />
      )}
      <QMR.CoreQuestionWrapper
        testid="how-did-you-report"
        label="Did you submit your CAHPS survey data to the AHRQ CAHPS Database during the June 2024 submission period?"
      >
        <CUI.Text mt="3" pb="3">
          Note: States that reported this measure in the AHRQ CAHPS Database
          will have the opportunity to preview the results in the spring.
        </CUI.Text>
        {isNotReportingData && (
          <QMR.RadioButton
            {...register("DidCollect")}
            options={[
              {
                displayValue:
                  "Yes, we submitted our CAHPS survey data to the AHRQ CAHPS Database during the June 2024 submission period.",
                value:
                  "Yes, we submitted our CAHPS survey data to the AHRQ CAHPS Database during the June 2024 submission period.",
                children: [
                  <QMR.RadioButton
                    {...register("HowDidYouReport")}
                    label="Would you like to enter data for this measure in the QMR system for FFY 2024 reporting?"
                    options={[
                      {
                        displayValue:
                          "Yes, I would like to enter data for this measure in the QMR system for FFY 2024 reporting..",
                        value:
                          "Yes, I would like to enter data for this measure in the QMR system for FFY 2024 reporting.",
                      },
                      {
                        displayValue:
                          "No, I would not like to enter data for this measure in the QMR system for FFY 2024 reporting.",
                        value:
                          "No, I would not like to enter data for this measure in the QMR system for FFY 2024 reporting.",
                      },
                    ]}
                  />,
                ],
              },
              {
                displayValue:
                  "No, we did not submit our CAHPS survey data to the AHRQ CAHPS Database during the June 2024 submission period.",
                value:
                  "No, we did not submit our CAHPS survey data to the AHRQ CAHPS Database during the June 2024 submission period.",
              },
            ]}
            formLabelProps={{ fontWeight: "bold" }}
          />
        )}
      </QMR.CoreQuestionWrapper>
    </>
  );
};
