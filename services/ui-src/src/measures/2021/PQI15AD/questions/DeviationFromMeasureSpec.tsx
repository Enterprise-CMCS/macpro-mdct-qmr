import * as QMR from "components";
import { Measure } from "../validation/types";
import { useCustomRegister } from "hooks/useCustomRegister";

const DeviationOptions = () => (
  <QMR.Checkbox
    label="Select and explain the deviation(s):"
    name={`DeviationFields.options`}
    key={`DeviationFields.options`}
    options={[
      {
        displayValue: "Numerator",
        value: `DeviationFields.Numerator`,
        children: [
          <QMR.TextArea
            label="Explain:"
            name={`DeviationFields.numerator`}
            key={`DeviationFields.numerator`}
          />,
        ],
      },
      {
        displayValue: "Denominator",
        value: `DeviationFields.Denominator`,
        children: [
          <QMR.TextArea
            label="Explain:"
            name={`DeviationFields.denominator`}
            key={`DeviationFields.denominator`}
          />,
        ],
      },
      {
        displayValue: "Other",
        value: `DeviationFields.Other`,
        children: [
          <QMR.TextArea
            label="Explain:"
            name={`DeviationFields.other`}
            key={`DeviationFields.other`}
          />,
        ],
      },
    ]}
  />
);

export const DeviationFromMeasureSpec = () => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="Deviations from Measure Specifications">
      <QMR.RadioButton
        renderHelperTextAbove
        {...register("DidCalculationsDeviate")}
        formLabelProps={{ fontWeight: 600 }}
        label="Did your calculation of the measure deviate from the measure specification in any way?"
        helperText="For example: deviation from measure specification might include different methodology, timeframe, or reported age groups."
        options={[
          {
            displayValue:
              "Yes, the calculation of the measure deviates from the measure specification.",
            value: "YesCalcDeviated",
            children: [<DeviationOptions />],
          },
          {
            displayValue:
              "No, the calculation of the measure does not deviate from the measure specification in any way.",
            value: "NoCalcDidNotDeviate",
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
