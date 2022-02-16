import * as QMR from "components";
import { Measure } from "../validation/types";
import { useCustomRegister } from "hooks/useCustomRegister";

interface Props {
  options: { label: string; id: number }[];
  deviationConditions: {
    showTotalRate: boolean;
    showBuprenorphine: boolean;
    showOralNaltrexone: boolean;
    showInjectableNaltrexone: boolean;
    showMethadone: boolean;
    showOtherPerformanceMeasureRates: boolean;
  };
}

interface OptionProps extends Props {
  name: string;
}

const deviationOptions = ({
  options,
  name,
}: OptionProps): QMR.CheckboxOption[] => {
  return options.map((item) => {
    return {
      displayValue: item.label,
      value: `${item.id}-${item.label.replace(/ /g, "")}`,
      children: [
        <QMR.Checkbox
          name={`${name}.${item.id}.options`}
          key={`${name}.${item.id}.options`}
          options={[
            {
              displayValue: "Numerator",
              value: `${item.id}.Numerator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.numerator`}
                  key={`${name}.${item.id}.numerator`}
                />,
              ],
            },
            {
              displayValue: "Denominator",
              value: `${item.id}.Denominator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.denominator`}
                  key={`${name}.${item.id}.denominator`}
                />,
              ],
            },
            {
              displayValue: "Other",
              value: `${item.id}.Other`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.other`}
                  key={`${name}.${item.id}.other`}
                />,
              ],
            },
          ]}
        />,
      ],
    };
  });
};

export const DeviationFromMeasureSpec = ({
  options,
  deviationConditions,
}: Props) => {
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
            children: [
              <QMR.Checkbox
                {...register("DeviationOptions")}
                formLabelProps={{ fontWeight: 600 }}
                label="Select and explain the deviation(s):"
                options={deviationOptions({
                  options,
                  ...register("DeviationFields"),
                  deviationConditions,
                })}
              />,
            ],
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
