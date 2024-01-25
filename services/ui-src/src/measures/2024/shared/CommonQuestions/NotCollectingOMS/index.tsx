import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

export const NotCollectingOMS = () => {
  return (
    <QMR.CoreQuestionWrapper
      testid="OMS"
      label="Optional Measure Stratification"
    >
      <CUI.Text>
        CMS is not collecting stratified data for this measure for FFY 2024 Core
        Set Reporting.
      </CUI.Text>
    </QMR.CoreQuestionWrapper>
  );
};
