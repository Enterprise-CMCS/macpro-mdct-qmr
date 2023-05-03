import * as QMR from "components";
import * as Types from "../types";
import * as DC from "dataConstants";
import { useCustomRegister } from "hooks/useCustomRegister";


export const DeviationFromMeasureSpec = () => {
  const register = useCustomRegister<Types.DeviationFromMeasureSpecification>();

  return (
    <QMR.CoreQuestionWrapper
      label="Deviations from Measure Specifications"
      testid="deviation-from-measure-specification"
    >
      <QMR.RadioButton
        renderHelperTextAbove
        {...register(DC.DID_CALCS_DEVIATE)}
        formLabelProps={{ fontWeight: 600 }}
        label="Did your calculation of the measure deviate from the measure specification in any way?"
        helperText="For example: deviation from measure specification might include different methodology, timeframe, or reported age groups."
        options={[
          {
            displayValue:
              "Yes, the calculation of the measure deviates from the measure specification.",
            value: DC.YES,
            children: [
              <QMR.TextArea
                {...register(DC.DEVIATION_REASON)}
                label="Explain the deviation(s):"
                formLabelProps={{
                  fontWeight: "normal",
                  fontSize: "normal",
                }}
              />,
            ],
          },
          {
            displayValue:
              "No, the calculation of the measure does not deviate from the measure specification in any way.",
            value: DC.NO,
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
