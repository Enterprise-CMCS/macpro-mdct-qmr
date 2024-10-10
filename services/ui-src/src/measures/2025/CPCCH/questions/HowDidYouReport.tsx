import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";

export const HowDidYouReport = () => {
  const register = useCustomRegister<FormData>();
  return (
    <QMR.CoreQuestionWrapper
      testid="how-did-you-report"
      label="Did you submit your CAHPS survey data to the AHRQ CAHPS Database during the June 2025 submission period?"
    >
      <CUI.Text mt="3" pb="3">
        Note: States that reported this measure in the AHRQ CAHPS Database will
        have the opportunity to preview the results in the spring.
      </CUI.Text>
      <QMR.RadioButton
        {...register("HowDidYouReport")}
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
