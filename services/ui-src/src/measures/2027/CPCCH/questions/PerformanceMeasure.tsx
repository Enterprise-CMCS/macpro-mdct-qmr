import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

export const PerformanceMeasure = () => {
  return (
    <QMR.CoreQuestionWrapper
      testid="performance-measure"
      label="Performance Measure"
    >
      <CUI.Text>
        This measure provides information on parents’ experiences with their
        child’s health care. Results summarize children’s experiences through
        ratings, composites, and individual question summary rates.
      </CUI.Text>
      <CUI.Text py="4">
        The Children with Chronic Conditions Supplemental Items provides
        information on parents’ experience with their child’s health care for
        the population of children with chronic conditions.
      </CUI.Text>
    </QMR.CoreQuestionWrapper>
  );
};
