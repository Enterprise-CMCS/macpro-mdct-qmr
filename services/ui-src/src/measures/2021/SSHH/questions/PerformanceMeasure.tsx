import * as Types from "measures/2021/CommonQuestions/types";
import * as QMR from "components";
import * as DC from "dataConstants";
import { useCustomRegister } from "hooks/useCustomRegister";

export const PerformanceMeasure = () => {
  const register = useCustomRegister<Types.PerformanceMeasure>();

  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      <QMR.TextArea
        label="Please describe the methodology used"
        {...register("PerformanceMeasure.explanation")}
        textAreaProps={{ mb: "8" }}
      />
      <QMR.RadioButton
        label="Does this performance measure apply to all ages?"
        formLabelProps={{ fontWeight: "700" }}
        data-cy="performance-measure-all-ages-apply"
        {...register(DC.PERFORMANCE_MEASURE_APPLY_ALL_AGES)}
        options={[
          {
            displayValue: "Yes, this performance measure applies to all ages.",
            value: DC.YES,
          },
          {
            displayValue:
              "No, this performance measure does not apply to all ages.",
            value: DC.NO,
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
