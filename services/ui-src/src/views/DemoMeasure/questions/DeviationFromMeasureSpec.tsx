import * as QMR from "components";
import { Measure } from "measures/types";
import { useCustomRegister } from "hooks/useCustomRegister";

export const defaultDeviationOptions = [
  { label: "Ages 18 to 64", id: 0 },
  { label: "Ages 65 to 74", id: 1 },
  { label: "Ages 75 to 84", id: 2 },
  { label: "Age 85 and older", id: 3 },
];

interface Props {
  options: { label: string; id: number }[];
}

interface OptionProps extends Props {
  name: string;
}

const deviationOptions = ({
  options,
  name,
}: OptionProps): QMR.CheckboxOption[] => {
  return options.map((item, index) => {
    return {
      displayValue: item.label,
      value: `${item.id}-${item.label.replace(/ /g, "").substring(0, 10)}`,
      children: [
        <QMR.Checkbox
          name={`${name}.${index}.options`}
          key={`${name}.${index}.options`}
          options={[
            {
              displayValue: "Numerator",
              value: `${item.id}.Numerator`,
              children: [
                <QMR.TextArea
                  label="Explain"
                  name={`${name}.${index}.numerator`}
                  key={`${name}.${index}.numerator`}
                />,
              ],
            },
            {
              displayValue: "Denominator",
              value: `${item.id}.Denominator`,
              children: [
                <QMR.TextArea
                  label="Explain"
                  name={`${name}.${index}.denominator`}
                  key={`${name}.${index}.denominator`}
                />,
              ],
            },
            {
              displayValue: "Other",
              value: `${item.id}.Other`,
              children: [
                <QMR.TextArea
                  label="Explain"
                  name={`${name}.${index}.other`}
                  key={`${name}.${index}.other`}
                />,
              ],
            },
          ]}
        />,
      ],
    };
  });
};

export const DeviationFromMeasureSpec = ({ options }: Props) => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="Deviations from Measure Specifications">
      <QMR.RadioButton
        renderHelperTextAbove
        {...register("DidCalculationsDeviate")}
        formLabelProps={{ fontWeight: 600 }}
        label="Did your calculation of the measure deviate from the measure specification in any way?"
        helperText="For Examples of deviation from measure specification might include different methodology, timeframe, or reported age groups."
        options={[
          {
            displayValue:
              "Yes, the calculation of the measure deviates from the measure specification.",
            value: "YesCalcDeviated",
            children: [
              <QMR.Checkbox
                {...register("DeviationOptions")}
                label="Select and explain the deviation(s):"
                formLabelProps={{ fontWeight: 600 }}
                options={deviationOptions({
                  options,
                  ...register("DeviationFields-Within30"),
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
