import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";

export const HowDidYouReport = () => {
  const register = useCustomRegister<FormData>();
  return (
    <QMR.CoreQuestionWrapper label="Did you submit your CAHPS survey data to the AHRQ CAHPS Database during the June 2025 submission period?">
      <CUI.Text py="3">
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
