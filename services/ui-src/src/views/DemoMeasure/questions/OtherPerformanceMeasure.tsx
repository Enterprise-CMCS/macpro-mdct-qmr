import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "measures/types";

export const OtherPerformanceMeasure = () => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="9. Other Performance Measure">
      <QMR.TextArea
        label="Describe the other methodology used:"
        {...register("OtherPerformanceMeasure-Explanation")}
      />
      <CUI.Box marginTop={10}>
        <CUI.Heading fontSize="lg" fontWeight="600">
          Describe the Rate:
        </CUI.Heading>
        <QMR.TextInput
          label="For example, specify the age groups and whether you are reporting on a certian indicator:"
          {...register("OtherPerformanceMeasure-Rates")}
        />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};
