import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { featuresByYear } from "utils/featuresByYear";

interface Props {
  year: string;
}

export const NotCollectingOMS = ({ year }: Props) => {
  return (
    <QMR.CoreQuestionWrapper
      testid="OMS"
      label={`${
        featuresByYear.displayOptionalLanguage ? "Optional " : ""
      }Measure Stratification`}
    >
      <CUI.Text>
        {`CMS is not collecting stratified data for this measure for ${
          featuresByYear.displayFFYLanguage ? "FFY" : ""
        } ${year} Core
        Set Reporting.`}
      </CUI.Text>
    </QMR.CoreQuestionWrapper>
  );
};
