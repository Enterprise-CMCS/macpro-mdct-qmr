import * as QMR from "components";
import { Measure } from "../validation/types";
import { useCustomRegister } from "hooks/useCustomRegister";

export const defaultDeviationOptions = [
  { label: "Ages 18 to 64", id: 0 },
  { label: "Age 65 and older", id: 1 },
];

interface Props {
  options: { label: string; id: number }[];
  deviationConditions: {
    show30DaysAges18To64: boolean;
    show30DaysAges65AndOlder: boolean;
    show7DaysAges18To64: boolean;
    show7DaysAges65AndOlder: boolean;
  };
}

interface OptionProps extends Props {
  name: string;
}

const deviationOptions = ({
  options,
  name,
  deviationConditions,
}: OptionProps): QMR.CheckboxOption[] => {
  let filteredOptions: Props["options"];

  if (name.includes("Within30")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.show30DaysAges18To64 && option.id === 0) ||
        (deviationConditions.show30DaysAges65AndOlder && option.id === 1)
      );
    });
  } else {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.show7DaysAges18To64 && option.id === 0) ||
        (deviationConditions.show7DaysAges65AndOlder && option.id === 1)
      );
    });
  }

  return filteredOptions.map((item, index) => {
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
                options={[
                  ...(deviationConditions.show30DaysAges18To64 ||
                  deviationConditions.show30DaysAges65AndOlder
                    ? [
                        {
                          value: "FollowUpWithin30",
                          displayValue: "Follow-up within 30 days of ED visit",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-Within30-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-Within30"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.show7DaysAges18To64 ||
                  deviationConditions.show7DaysAges65AndOlder
                    ? [
                        {
                          value: "FollowUpWithin7",
                          displayValue: "Follow-up within 7 days of ED visit",
                          children: [
                            <QMR.Checkbox
                              {...register("DeviationOptions-Within7-AgeRange")}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-Within7"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                ]}
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
