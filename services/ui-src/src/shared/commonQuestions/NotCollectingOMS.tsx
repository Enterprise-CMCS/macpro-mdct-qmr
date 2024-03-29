import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

interface Props {
  year: string;
}

export const NotCollectingOMS = ({ year }: Props) => {
  return (
    <QMR.CoreQuestionWrapper
      testid="OMS"
      label="Optional Measure Stratification"
    >
      <CUI.Text>
        {`CMS is not collecting stratified data for this measure for FFY ${year} Core
        Set Reporting.`}
      </CUI.Text>
    </QMR.CoreQuestionWrapper>
  );
};
